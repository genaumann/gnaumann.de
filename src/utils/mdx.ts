import fs from 'fs'
import path from 'path'
import {compileMDX} from 'next-mdx-remote/rsc'
import type {CompileOptions} from '@mdx-js/mdx'
import frontmatter from 'remark-frontmatter'
import remarkgfm from 'remark-gfm'

const rootDirectory = path.join(process.cwd(), 'src')

interface getPostBySlugProps {
  kb: string[]
}

export const mdxOptions: CompileOptions = {
  remarkPlugins: [frontmatter, remarkgfm],
  rehypePlugins: []
}

export const getPostBySlug = async ({kb}: getPostBySlugProps) => {
  const filePath = path.join(rootDirectory, 'articles', `${kb.join('/')}.mdx`)

  const fileContent = fs.readFileSync(filePath, {encoding: 'utf8'})

  const {frontmatter} = await compileMDX({
    source: fileContent,
    options: {parseFrontmatter: true, mdxOptions}
  })

  return {meta: {...frontmatter}, fileContent}
}

export const getMDXByPath = async (filePath: string) => {
  const fullPath = path.join(rootDirectory, filePath)

  const fileContent = fs.readFileSync(fullPath, {encoding: 'utf8'})

  return (await compileMDX({source: fileContent, options: {mdxOptions}}))
    .content
}
