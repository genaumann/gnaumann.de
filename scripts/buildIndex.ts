import * as fs from 'fs'
import path from 'path'
import yaml from 'yaml'
import * as child from 'child_process'
import {KBIndex} from '@/types'

interface MdxMetadata {
  [key: string]: any
  description: string
  sort?: number
}

interface Sortable {
  sort?: number
  [key: string]: any
}

const getMdxStructure = (dir: string, depth = 0): string[] => {
  const files = fs.readdirSync(dir)
  const mdxFiles: string[] = []

  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      if (depth < 1) {
        const subdirMdxFiles = getMdxStructure(filePath, depth + 1)
        mdxFiles.push(...subdirMdxFiles)
      }
    } else if (path.extname(file) === '.mdx') {
      if (depth === 1 && path.basename(file) === 'index.mdx') {
        mdxFiles.push(filePath)
      } else if (depth === 0) {
        mdxFiles.push(filePath)
      }
    }
  })

  return mdxFiles
}

const readFileContent = (filePath: string): string => {
  const content = fs.readFileSync(path.resolve(filePath), 'utf8')
  return content
}

const parseMdxMetadata = (filePath: string): MdxMetadata => {
  const fileContent = readFileContent(filePath)
  const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const match = fileContent.match(frontMatterRegex)

  if (!match || match.length < 2) {
    throw new Error(`No YAML Front Matter found in ${filePath}`)
  }

  const yamlContent = match[1]
  const data = yaml.parse(yamlContent)
  return data
}

const buildTreeObject = (filePath: string, run: number) => {
  const dirName = path.dirname(filePath)
  const fileContent = readFileContent(filePath)
  const metaData = parseMdxMetadata(filePath)
  const createDate = child.execSync(
    `git log --follow --format=%aI -1 --date default ${filePath}`
  )
  const modifyDate = child.execSync(
    `git log -1 --format=%cd --date=format:'%Y-%m-%d' ${filePath}`
  )
  const fallbackDate = new Date().toISOString().split('T')[0]
  let children: string[] = []

  if (path.basename(filePath) === 'index.mdx') {
    children = getMdxStructure(dirName)
  }

  const title = fileContent.match(/^#\ .*/gm)
  const articleTree: KBIndex = {
    title: Array.isArray(title)
      ? title[0]
          .replace('# ', '')
          .replace(/(\s(<.*?>)(.*?)(<\/.*?>))|(\s<.*?\/>)/g, '')
      : 'Unknown',
    href: filePath.replace(/^src\/articles/g, '/kb').replace(/.mdx$/g, ''),
    description: metaData.description,
    level: run,
    sort: metaData.sort,
    head: children.length > 0 ? true : false,
    createDate: createDate.toString().replace('\n', '') || fallbackDate,
    modifyDate: modifyDate.toString().replace('\n', '') || fallbackDate,
    children: undefined
  }

  if (children.length > 0) {
    const childTrees: KBIndex[] = []
    children.forEach(child => {
      if (child !== filePath) {
        childTrees.push(buildTreeObject(child, run + 1))
      }
    })
    articleTree.children = childTrees
  }

  return articleTree
}

const recursiveSort = (array: Sortable[]): Sortable[] => {
  array.sort((a, b) => {
    if (a.sort === undefined) return 1
    if (b.sort === undefined) return -1
    return a.sort - b.sort
  })

  array.forEach(item => {
    Object.keys(item).forEach(key => {
      const value = item[key]
      if (Array.isArray(value)) {
        item[key] = recursiveSort(value)
      }
    })
  })

  return array
}

const buildIndex = (): void => {
  const mdxStructure = getMdxStructure('src/articles')
  const tree: KBIndex[] = []

  mdxStructure.forEach(file => {
    tree.push(buildTreeObject(file, 0))
  })

  const sortedTree = recursiveSort(tree)

  console.log(JSON.stringify(sortedTree, null, 2))
  fs.writeFileSync('src/KBIndex.json', JSON.stringify(sortedTree), 'utf-8')
}

buildIndex()
