import KBMobileNav from '@/components/layout/kb/KBMobileNav'
import {KBLayoutProps} from '@/types'
import KBNav from '@/components/layout/kb/KBNav'
import SearchButton from '@/components/SearchButton'
import KBIndex from '@/KBIndex.json'
import KBToc from '@/components/layout/kb/KBToc'

const KBLayout = ({children}: KBLayoutProps) => {
  return (
    <>
      <div className="lg:hidden md:-mx-8 -mx-4">
        <KBMobileNav index={KBIndex} />
      </div>
      <div className="lg:flex gap-x-10 relative">
        <div className="lg:sticky overflow-y-auto top-[6rem] h-[calc(100vh-180px)] hidden lg:block min-w-[224px] max-w-[224px]">
          <SearchButton className="py-2" location="body" />
          <KBNav index={KBIndex} />
        </div>
        <article className="grow mt-3 prose">{children}</article>
        <div className="hidden overflow-y-auto xl:block xl:sticky top-[6rem] h-[calc(100vh-180px)]">
          <KBToc />
        </div>
      </div>
    </>
  )
}

export default KBLayout
