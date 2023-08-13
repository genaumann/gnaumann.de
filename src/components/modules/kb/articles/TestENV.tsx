'use client'

import {FC, Fragment, useState} from 'react'
import Icon from './Icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faVialCircleCheck
} from '@fortawesome/pro-duotone-svg-icons'
import {Dialog, Transition} from '@headlessui/react'
import clsx from 'clsx'

interface Softwares {
  name: string
  version: string
}

export interface TestENV {
  os: string
  osIcon: string
  osIconSize?: string
  softwares: Softwares[]
}

interface TestENVProps {
  conf: TestENV[]
}

const TestENV: FC<TestENVProps> = ({conf}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [activeOS, setActiveOS] = useState<number | null>(null)

  if (conf) {
    return (
      <div className="not-prose">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-2 py-1 rounded-md bg-green-800/60 hover:ring hover:ring-green-200 flex gap-2 items-center">
          <FontAwesomeIcon icon={faVialCircleCheck} />
          Testumgebung
        </button>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            className="relative z-10"
            open={isOpen}
            onClose={() => setIsOpen(false)}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <div className="fixed inset-0 backdrop-blur-md" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95">
                  <Dialog.Panel className="relative min-w-[250px] max-w-[250px] md:min-w-[500px] md:max-w-[250px] transform rounded-md bg-gray-200 p-6 text-left align-middle transition-all">
                    <div className="absolute inset-3 flex gap-2 h-2.5">
                      <button
                        className="w-2.5 h-2.5 bg-red-600 rounded-full"
                        onClick={() => {
                          setIsOpen(!isOpen), setActiveOS(null)
                        }}
                      />
                      <button
                        className="w-2.5 h-2.5 bg-green-600 rounded-full"
                        onClick={() => setIsOpen(!isOpen)}
                      />
                    </div>

                    {activeOS === null ? (
                      <div
                        className={clsx('grid grid-cols-1  gap-4 mt-3', {
                          'md:grid-cols-2': conf.length > 1
                        })}>
                        {conf.map((env, index) => {
                          return (
                            <div
                              key={index}
                              onClick={() => setActiveOS(index)}
                              className="border border-secondary/60 hover:ring hover:ring-primary hover:text-primary p-3 rounded-md">
                              <div className="flex justify-between items-center cursor-pointer">
                                <div className="flex gap-x-3 items-center">
                                  <Icon
                                    //   className="max-w-[250px] min-w-[250px]"
                                    name={env.osIcon}
                                    size={env.osIconSize}
                                  />
                                  {env.os}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="block mt-3">
                        <div className="flex items-center justify-between pb-2">
                          <button
                            className="flex items-center gap-2 px-2 py-1 bg-secondary rounded-xl hover:text-primary"
                            onClick={() => setActiveOS(null)}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                            <p className="text-sm">Zurück</p>
                          </button>

                          <div className="bg-indigo-500 px-2 py-1 rounded-xl text-sm">
                            {conf[activeOS].os}
                          </div>
                        </div>
                        {conf[activeOS].softwares.length > 0 && (
                          <table className="mt-6 min-w-full divide-y divide-secondary/60">
                            <thead>
                              <tr>
                                <th scope="col">Paketname</th>
                                <th scope="col" className="text-right">
                                  Paketversion
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-secondary/60">
                              {conf[activeOS].softwares.map(
                                (software, sindex) => (
                                  <tr key={sindex}>
                                    <td>{software.name}</td>
                                    <td className="text-right">
                                      {software.version}
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        )}
                      </div>
                    )}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    )
  }
  return <></>
}

export default TestENV
