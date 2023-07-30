import Admonition, {
  Title as AdmonitionTitle,
  Content as AdmonitionContent
} from '@/components/modules/kb/articles/Admonition'
import {getPostBySlug, mdxOptions} from '@/utils/mdx'
import {MDXRemote} from 'next-mdx-remote/rsc'
import {notFound} from 'next/navigation'

interface KBArticleProps {
  params: {
    kb: string[]
  }
}

const components = {
  Admonition,
  AdmonitionTitle,
  AdmonitionContent
}

const KBArticle = async ({params}: KBArticleProps) => {
  try {
    const {fileContent} = await getPostBySlug(params)
    return (
      <article className="prose">
        <MDXRemote
          source={fileContent}
          // @ts-ignore
          components={{...components}}
          options={{mdxOptions}}
        />
      </article>
    )
  } catch (error) {
    notFound()
  }
}

export default KBArticle
