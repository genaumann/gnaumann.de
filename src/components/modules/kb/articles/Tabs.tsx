'use client'

import {addComponent, resetComponent} from '@/redux/kb/component-counter'
import {AppDispatch, useAppSelector} from '@/redux/store'
import clsx from 'clsx'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import React, {useCallback, useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {v4 as uuidv4} from 'uuid'
import {TabProps} from './Tab'

export interface TabsProps {
  activeTab?: number
  children: React.ReactElement<TabProps>[]
}

const Tabs: React.FC<TabsProps> = ({children, activeTab = 0}) => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const searchParams = useSearchParams()!
  const pathname = usePathname()
  const [uid, setUid] = useState(uuidv4())

  const createQueryString = useCallback(
    (name: string, value: string) => {
      // @ts-ignore
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  useEffect(() => {
    return () => {
      dispatch(resetComponent())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    dispatch(addComponent(uid))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid])

  const id = useAppSelector(
    state => state.KBCompontentCounter.componentIds[uid]
  )

  const [currentTab, setCurrentTab] = useState(
    parseInt(searchParams.get(`t${id}`) || activeTab.toString())
  )

  useEffect(() => {
    setCurrentTab(parseInt(searchParams.get(`t${id}`) || activeTab.toString()))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <>
      <div className="sm:hidden mt-5">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          name="tabs"
          onChange={e => {
            setCurrentTab(e.target.selectedIndex)
            router.replace(
              `${pathname}?${createQueryString(
                `t${id}`,
                e.target.selectedIndex.toString()
              )}`,
              {scroll: false}
            )
          }}
          className="block py-2 border-0 pr-8 pl-4 w-full rounded-xl bg-gray-200 font-bold text-base focus:outline-none">
          {React.Children.map(children, (tab, index) => (
            <option
              key={index}
              value={tab.props.title}
              dangerouslySetInnerHTML={{__html: tab.props.title}}
            />
          ))}
        </select>
      </div>
      <div className="hidden sm:block mt-3">
        <div className="border-b border-secondary/60">
          <nav className="-mb-px flex space-x-4" aria-label={`Tab ${id}`}>
            {React.Children.map(children, (tab, index) => (
              <button
                key={tab.props.title}
                onClick={() => {
                  setCurrentTab(index)
                  router.replace(
                    `${pathname}?${createQueryString(
                      `t${id}`,
                      index.toString()
                    )}`,
                    {scroll: false}
                  )
                }}
                className={clsx(
                  index === currentTab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-800 hover:border-gray-300',
                  'whitespace-nowrap border-b-2 py-2 px-1'
                )}
                aria-current={index === currentTab ? 'page' : undefined}
                dangerouslySetInnerHTML={{__html: tab.props.title}}
              />
            ))}
          </nav>
        </div>
      </div>
      {children[currentTab]}
    </>
  )
}

export default Tabs
