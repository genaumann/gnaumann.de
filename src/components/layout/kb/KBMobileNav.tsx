'use client'

import {faChevronDown, faChevronRight} from '@fortawesome/pro-duotone-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Dialog} from '@headlessui/react'
import React, {useState} from 'react'
import {KBNavProps} from '@/types'
import KBNav from './KBNav'

const KBMobileNav: React.FC<KBNavProps> = ({index}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        className="w-full py-3 border-b border-secondary/60 sticky top-0"
        onClick={() => setIsOpen(true)}>
        <div className="mx-4 md:mx-7 lg:mx-10">
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
      </div>
      <Dialog
        open={isOpen}
        onClose={setIsOpen}
        className="z-50 md:hidden backdrop-blur-2xl fixed top-[134.55px] min-h-full min-w-full w-full">
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
