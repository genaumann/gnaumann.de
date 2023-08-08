'use client'

import {faChevronDown, faChevronRight} from '@fortawesome/pro-duotone-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Dialog} from '@headlessui/react'
import React, {useState} from 'react'
import {KBNavProps} from '@/types'
import KBNav from './KBNav'
import SearchButton from '@/components/SearchButton'

const KBMobileNav: React.FC<KBNavProps> = ({index}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="w-full py-3 border-b border-secondary/60 sticky top-0">
        <div className="flex justify-between">
          <div
            className="grow mx-4 md:mx-7 lg:mx-10 self-center"
            onClick={() => setIsOpen(true)}>
            {isOpen ? (
              <FontAwesomeIcon icon={faChevronDown} className="mr-2" />
            ) : (
              <FontAwesomeIcon
                icon={faChevronRight}
                className="mr-2 min-w-[16px]"
              />
            )}
            Menü
          </div>
          <div className="shrink md:mx-7 mx-4">
            <SearchButton className="py-1 px-2" location="body" />
          </div>
        </div>
      </div>
      <Dialog
        open={isOpen}
        onClose={setIsOpen}
        className="z-50 lg:hidden backdrop-blur-2xl fixed top-[134.55px] min-h-full min-w-full w-full">
        <Dialog.Panel className="min-w-full w-full">
          <div className="mx-4 md:mx-7 lg:mx-10">
            <KBNav index={index} />
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}

export default KBMobileNav
