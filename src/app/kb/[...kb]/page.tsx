import Admonition, {
  Title as AdmonitionTitle,
  Content as AdmonitionContent
} from '@/components/modules/kb/articles/Admonition'
import {Tab} from '@/components/modules/kb/articles/Tabs'
import {getPostBySlug, mdxOptions} from '@/utils/mdx'
import {MDXRemote} from 'next-mdx-remote/rsc'
import dynamic from 'next/dynamic'
import {notFound} from 'next/navigation'
import {Suspense} from 'react'

interface KBArticleProps {
  params: {
    kb: string[]
  }
}

const Tabs = dynamic(() => import('@/components/modules/kb/articles/Tabs'), {
  ssr: false
})

const components = {
  Admonition,
  AdmonitionTitle,
  AdmonitionContent,
  Tabs: (props: any) => (
    <Suspense>
      <Tabs {...props}>{props.children}</Tabs>
    </Suspense>
  ),
  Tab
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
