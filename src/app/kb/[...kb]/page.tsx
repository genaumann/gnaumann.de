'use client'

import {KBLayout} from '@/types'
import dynamic from 'next/dynamic'

const KBArticle = ({params}: KBLayout) => {
  const Article = dynamic(
    () => import(`@/articles/${params.kb.join('/')}.mdx`),
    {ssr: false}
  )
  return <Article />
}

export default KBArticle
