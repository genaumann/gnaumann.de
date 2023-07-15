'use client'

import Image from 'next/image'
import Link from 'next/link'
import imageDark from '@pub/gnaumann_white_cut.png'
import imageLight from '@pub/gnaumann_col_cut.png'
import {NavEntries, SocialIcons} from './Items'
import {useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/pro-regular-svg-icons'
import HeaderDialog from './Dialog'
import Modal from '@/components/Modal'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
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
          <SocialIcons />
        </div>
        <div className="md:hidden ml-auto flex space-x-4">
          <FontAwesomeIcon
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl"
            icon={faMagnifyingGlass}
          />
          <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Die Suche ist noch nicht verfügbar"
            description="Docsearch kommt bald 🚀"
          />
          <HeaderDialog />
        </div>
      </nav>
    </header>
  )
}

export default Header
