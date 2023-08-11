import Image from 'next/image'
import Link from 'next/link'
import imageDark from '@pub/gnaumann_white_cut.png'
import imageLight from '@pub/gnaumann_col_cut.png'
import {NavEntries, SocialIcons} from './Items'
import SearchButton from '@/components/SearchButton'
import HeaderDialog from './Dialog'
import dynamic from 'next/dynamic'

const ThemeSwitch = dynamic(() => import('./ThemeSwitch'), {ssr: false})

const Header = () => {
  return (
    <header className="border-b border-secondary/60 sticky top-0 backdrop-blur z-10">
      <nav className="mx-4 md:mx-7 lg:mx-10 py-2 flex items-center">
        <Link href={'/'}>
          <Image
            src={imageLight}
            alt="Home"
            height={65}
            className="dark:hidden"
          />

          <Image
            src={imageDark}
            alt="Home"
            height={65}
            className="hidden dark:block"
          />
        </Link>
        <ul className="hidden md:flex space-x-6 mx-auto font-bold">
          <NavEntries />
        </ul>
        <div className="hidden md:flex space-x-3">
          <div className="border-r border-slate-500 mr-3 min-w-[40px] min-h-[27px]">
            <ThemeSwitch size="xl" className="mr-3" />
          </div>
          <SocialIcons />
        </div>
        <div className="md:hidden ml-auto flex space-x-4">
          <div className="border-r border-slate-500 min-w-[40px] min-h-[27px]">
            <ThemeSwitch size="xl" className="mr-3" />
          </div>
          <SearchButton location="header" />
          <HeaderDialog />
        </div>
      </nav>
    </header>
  )
}

export default Header
