import KBMobileNav from '@/components/layout/kb/KBMobileNav'
import {KBLayoutProps} from '@/types'
import KBNav from '@/components/layout/kb/KBNav'
import SearchButton from '@/components/SearchButton'
import KBIndex from '@/KBIndex.json'
import KBToc from '@/components/layout/kb/KBToc'

const KBLayout = ({children}: KBLayoutProps) => {
  return (
    <>
      <div className="md:hidden -mx-4">
        <KBMobileNav index={KBIndex} />
      </div>
      <div className="md:flex gap-x-10 relative">
        <div className="hidden md:block min-w-[224px] max-w-[224px]">
          <SearchButton className="py-2 mt-3" location="body" />
          <KBNav index={KBIndex} />
        </div>
        <article className="grow mt-3 prose">{children}</article>
        <KBToc />
      </div>
    </>
  )
}

export default KBLayout
