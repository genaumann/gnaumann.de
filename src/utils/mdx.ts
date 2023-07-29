import fs from 'fs'
import path from 'path'
import {compileMDX} from 'next-mdx-remote/rsc'

const rootDirectory = path.join(process.cwd(), 'src', 'articles')

interface getPostBySlugProps {
  kb: string[]
}

export const getPostBySlug = async ({kb}: getPostBySlugProps) => {
  const filePath = path.join(rootDirectory, `${kb.join('/')}.mdx`)

  const fileContent = fs.readFileSync(filePath, {encoding: 'utf8'})

  const {frontmatter, content} = await compileMDX({
    source: fileContent,
    options: {parseFrontmatter: true}
  })

  return {meta: {...frontmatter}, content}
}
