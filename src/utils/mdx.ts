import fs from 'fs'
import path from 'path'
import {compileMDX} from 'next-mdx-remote/rsc'
import type {CompileOptions} from '@mdx-js/mdx'
import frontmatter from 'remark-frontmatter'
import remarkgfm from 'remark-gfm'
import {remarkCodeblock} from '@/remark/codeblock'
import rehhypeHighlightCode from '@/rehype/highlightCode'
import emoji from 'remark-emoji'
import headingId from 'remark-custom-heading-id'

const rootDirectory = path.join(process.cwd(), 'src')

interface getPostBySlugProps {
  kb: string[]
}

export const mdxOptions: CompileOptions = {
  remarkPlugins: [frontmatter, remarkgfm, remarkCodeblock, emoji, headingId],
  rehypePlugins: [rehhypeHighlightCode]
}

export const getPostBySlug = async ({kb}: getPostBySlugProps) => {
  try {
    const filePath = path.join(rootDirectory, 'articles', `${kb.join('/')}.mdx`)

    const fileContent = fs.readFileSync(filePath, {encoding: 'utf8'})

    const {frontmatter} = await compileMDX({
      source: fileContent,
      options: {parseFrontmatter: true, ...mdxOptions}
    })

    return {meta: {...frontmatter}, fileContent}
  } catch (e) {
    console.log(`${kb.join('/')} not found`)
    return {}
  }
}

export const getMDXByPath = async (filePath: string) => {
  const fullPath = path.join(rootDirectory, filePath)

  return fs.readFileSync(fullPath, {encoding: 'utf8'})
}
