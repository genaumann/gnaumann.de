import {getPostBySlug} from '@/utils/mdx'
import {notFound} from 'next/navigation'

interface KBArticleProps {
  params: {
    kb: string[]
  }
}

const KBArticle = async ({params}: KBArticleProps) => {
  try {
    const {content} = await getPostBySlug(params)
    return <article className="prose">{content}</article>
  } catch (error) {
    notFound()
  }
}

export default KBArticle
