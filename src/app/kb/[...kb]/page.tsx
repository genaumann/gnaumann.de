import Admonition from '@/components/modules/kb/articles/Admonition'
import CodeBlockPlain from '@/components/modules/kb/articles/CodeBlockPlain'
import Icon from '@/components/modules/kb/articles/Icons'
import Tabs from '@/components/modules/kb/articles/Tabs'
import Tab from '@/components/modules/kb/articles/Tab'
import {findArticleByHref} from '@/utils'
import {getPostBySlug, mdxOptions} from '@/utils/mdx'
import {Metadata} from 'next'
import {MDXRemote} from 'next-mdx-remote/rsc'
import dynamic from 'next/dynamic'
import {notFound} from 'next/navigation'
import KBIndex from '@/KBIndex.json'
import {Grid, GridItem} from '@/components/modules/kb/articles/Grid'
import {TestENV} from '@/components/modules/kb/articles/TestENV'

interface KBArticleProps {
  params: {
    kb: string[]
  }
}

export const generateMetadata = async ({
  params
}: KBArticleProps): Promise<Metadata> => {
  const article = findArticleByHref(KBIndex, `/kb/${params.kb.join('/')}`)

  const title = `GNaumann · KB · ${article ? article.title : 'Unknown'}`
  const description = article ? article.description : 'GNaumann KB Artikel'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/kb/${params.kb.join('/')}`,
      type: 'article',
      authors: article?.author,
      modifiedTime: article
        ? new Date(article.modifyDate).toISOString()
        : undefined,
      publishedTime: article
        ? new Date(article.createDate).toISOString()
        : undefined,
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
  const {fileContent, meta} = await getPostBySlug(params)

  if (!fileContent) {
    notFound()
  }

  const CodeBlockFile = dynamic(
    () => import('@/components/modules/kb/articles/CodeBlockFile'),
    {ssr: false}
  )
  const TestENV = dynamic(
    () => import('@/components/modules/kb/articles/TestENV'),
    {ssr: false}
  )
  const AdmonitionTitle = dynamic(async () => {
    const {Title} = await import('@/components/modules/kb/articles/Admonition')
    return {default: Title}
  })

  const AdmonitionContent = dynamic(async () => {
    const {Content} = await import(
      '@/components/modules/kb/articles/Admonition'
    )
    return {default: Content}
  })

  const components = {
    Admonition,
    AdmonitionTitle,
    AdmonitionContent,
    Tabs,
    Tab,
    CodeBlockFile,
    CodeBlockPlain,
    Icon,
    Grid,
    GridItem,
    TestENV: (props: any) => <TestENV conf={meta.testenv as TestENV[]} />
  }

  return (
    <MDXRemote
      source={fileContent}
      // @ts-ignore
      components={{...components}}
      options={{mdxOptions}}
    />
  )
}

export default KBArticle
