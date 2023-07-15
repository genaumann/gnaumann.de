import {NavItemsT} from '@/types'
import {faChevronDown} from '@fortawesome/pro-regular-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Popover, Transition} from '@headlessui/react'
import Link from 'next/link'
import React, {Fragment} from 'react'

interface HeadDropDownProps {
  button: string
  entries: NavItemsT[]
}

const HeadDropDown: React.FC<HeadDropDownProps> = ({button, entries}) => {
  return (
    <Popover className="relative">
      <Popover.Button className="hover:text-primary">
        {button}
        <FontAwesomeIcon icon={faChevronDown} fixedWidth />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1">
        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-min -translate-x-1/2 px-4">
          {({close}) => (
            <div className="w-56 shrink rounded-xl bg-gray-200 p-4 font-semibold leading-6 shadow-lg ring-1 ring-gray-900/5">
              {entries.map(entry => (
                <div key={entry.title} className="flex items-center">
                  {entry.icon && (
                    <div className="text-primary">{entry.icon}</div>
                  )}
                  {entry.href ? (
                    <Link
                      key={entry.title}
                      href={entry.href}
                      onClick={() => {
                        close()
                      }}
                      className="block p-2 hover:text-primary">
                      {entry.title}
                    </Link>
                  ) : (
                    <>{entry.title}</>
                  )}
                </div>
              ))}
            </div>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

export default HeadDropDown
