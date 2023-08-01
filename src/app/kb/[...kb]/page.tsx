import Admonition, {
  Title as AdmonitionTitle,
  Content as AdmonitionContent
} from '@/components/modules/kb/articles/Admonition'
import CodeBlockPlain from '@/components/modules/kb/articles/CodeBlockPlain'
import Icon from '@/components/modules/kb/articles/Icons'
import {Tab} from '@/components/modules/kb/articles/Tabs'
import {findArticleByHref} from '@/utils'
import {getPostBySlug, mdxOptions} from '@/utils/mdx'
import {Metadata, ResolvingMetadata} from 'next'
import {MDXRemote} from 'next-mdx-remote/rsc'
import dynamic from 'next/dynamic'
import {notFound} from 'next/navigation'
import {Suspense} from 'react'
import KBIndex from '@/KBIndex.json'
import {basePath} from '@/config'

interface KBArticleProps {
  params: {
    kb: string[]
  }
}

const Tabs = dynamic(() => import('@/components/modules/kb/articles/Tabs'), {
  ssr: false
})
const CodeBlockFile = dynamic(
  () => import('@/components/modules/kb/articles/CodeBlockFile'),
  {ssr: false}
)

const components = {
  Admonition,
  AdmonitionTitle,
  AdmonitionContent,
  Tabs: (props: any) => (
    <Suspense>
      <Tabs {...props}>{props.children}</Tabs>
    </Suspense>
  ),
  Tab,
  CodeBlockFile,
  CodeBlockPlain,
  Icon
}

export const generateMetadata = async (
  {params}: KBArticleProps,
  parent?: ResolvingMetadata
): Promise<Metadata> => {
  const prevMeta = (await parent) as Metadata
  const article = findArticleByHref(KBIndex, `/kb/${params.kb.join('/')}`)

  const title = `GNaumann · KB · ${article ? article.title : 'Unknown'}`
  const description = article ? article.description : 'GNaumann KB Artikel'

  return {
    ...prevMeta,
    metadataBase: new URL(basePath),
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/${params.kb.join('/')}`,
      siteName: 'gnaumann.de',
      images: [
        {
          alt: title,
          type: 'image/png',
          width: 1200,
          height: 630,
          url: `/opengraph/${params.kb.join('/')}?type=kb`
        }
      ]
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
      site: 'gnaumann.de',
      images: [
        {
          alt: title,
          type: 'image/png',
          width: 1200,
          height: 630,
          url: `/opengraph/${params.kb.join('/')}?type=kb`
        }
      ]
    }
  }
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
