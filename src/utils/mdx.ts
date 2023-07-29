import fs from 'fs'
import path from 'path'
import {compileMDX} from 'next-mdx-remote/rsc'

const rootDirectory = path.join(process.cwd(), 'src')

interface getPostBySlugProps {
  kb: string[]
}

export const getPostBySlug = async ({kb}: getPostBySlugProps) => {
  const filePath = path.join(rootDirectory, 'articles', `${kb.join('/')}.mdx`)

  const fileContent = fs.readFileSync(filePath, {encoding: 'utf8'})

  const {frontmatter, content} = await compileMDX({
    source: fileContent,
    options: {parseFrontmatter: true}
  })

  return {meta: {...frontmatter}, content}
}

export const getMDXByPath = async (filePath: string) => {
  const fullPath = path.join(rootDirectory, filePath)

  const fileContent = fs.readFileSync(fullPath, {encoding: 'utf8'})

  return (await compileMDX({source: fileContent})).content
}
