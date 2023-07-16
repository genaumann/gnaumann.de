import KBMobileNav from '@/components/layout/kb/KBMobileNav'
import {KBLayoutProps} from '@/types'
import KBIndex from '@/KBIndex.json'
import KBNav from '@/components/layout/kb/KBNav'
import KBNavSearch from '@/components/layout/kb/KBNavSearch'
import {Metadata} from 'next'
import {findArticleByHref} from '@/utils'

export const generateMetadata = async ({
  params
}: KBLayoutProps): Promise<Metadata> => {
  const article = findArticleByHref(KBIndex, `/kb/${params.kb.join('/')}`)
  return {
    title: `GNaumann · KB · ${article ? article.title : 'Unknown'}`,
    description: article ? article.description : 'GNaumann KB Artikel',
    authors: [{name: 'Gino Naumann', url: 'https://gnaumann.de'}]
  }
}

const KBLayout = ({children}: KBLayoutProps) => {
  return (
    <>
      <div className="md:hidden -mx-4">
        <KBMobileNav index={KBIndex} />
      </div>
      <div className="md:flex gap-x-10">
        <div className="hidden md:block min-w-[224px] max-w-[224px]">
          <KBNavSearch />
          <KBNav index={KBIndex} />
        </div>
        <article className="grow mt-3 prose">{children}</article>
      </div>
    </>
  )
}

export default KBLayout
