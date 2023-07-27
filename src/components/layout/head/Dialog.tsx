'use client'

import {Dialog} from '@headlessui/react'
import {useState} from 'react'
import {NavEntries, SocialIcons} from './Items'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/pro-regular-svg-icons'
import {useNavigationEvent} from '@/hooks/useNavigationEvent'

const HeaderDialog = () => {
  const [isOpen, setIsOpen] = useState(false)
  useNavigationEvent(() => setIsOpen(false))

  return (
    <>
      <FontAwesomeIcon
        className="text-2xl"
        icon={faBars}
        onClick={() => setIsOpen(!isOpen)}
      />
      <Dialog
        as="div"
        className="fixed z-50 inset-0 md:hidden"
        open={isOpen}
        onClose={setIsOpen}>
        <Dialog.Overlay className="fixed inset-0 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80" />
        <div className="fixed top-4 right-4 w-full max-w-xs bg-white rounded-lg shadow-lg p-6 text-base font-semibold dark:bg-slate-800">
          <ul className="divide-y-2 divide-slate-700/60">
            <NavEntries className="py-3" />
          </ul>
          <div className="flex justify-center space-x-5 mt-3">
            <SocialIcons />
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default HeaderDialog
