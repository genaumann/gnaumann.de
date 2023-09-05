'use client'

import React, {ReactNode, useContext, useEffect, useState} from 'react'
import clsx from 'clsx'
import {ChildProps} from '@/types'
import Icon from './Icons'

export interface AdmonitionProps {
  variant: 'info' | 'warning' | 'danger' | 'tip' | 'success' | 'question'
  children?: ReactNode
  expand?: boolean
  disableIcon?: boolean
}

interface AdmonitionContext extends AdmonitionProps {
  hasContent?: boolean
  setShow?: React.Dispatch<React.SetStateAction<boolean>>
  setHasContent?: React.Dispatch<React.SetStateAction<boolean>>
}

type iconMap = {
  [index: string]: string
}

const AdmonitionContext = React.createContext<AdmonitionContext>({
  variant: 'info'
})

const Admonition: React.FC<AdmonitionProps> & {
  Title: React.FC<ChildProps>
  Content: React.FC<ChildProps>
} = ({variant, children, disableIcon, expand}) => {
  const [show, setShow] = useState(expand)
  const [hasContent, setHasContent] = useState(false)

  const variantMap = {
    'bg-error/30 border-error': variant == 'danger',
    'bg-cyan-600/30 border-cyan-600': variant == 'tip',
    'bg-info/30 border-info': variant == 'info',
    'bg-warning/30 border-warning': variant == 'warning',
    'bg-success/30 border-success': variant == 'success',
    'bg-blue-600/30 border-blue-600': variant == 'question'
  }

  return (
    <AdmonitionContext.Provider
      value={{
        variant,
        children,
        show,
        setShow,
        setHasContent,
        hasContent,
        disableIcon
      }}>
      <div
        className={clsx(variantMap, 'mt-3 rounded-xl py-2 px-4 border w-full')}>
        {children}
      </div>
    </AdmonitionContext.Provider>
  )
}

export const Title = ({children}: ChildProps) => {
  const context = useContext(AdmonitionContext)
  const {variant, hasContent, show, setShow, disableIcon} = context

  const iconMap: iconMap = {
    danger: 'faBolt',
    info: 'faCircleInfo',
    warning: 'faTriangleExclamation',
    tip: 'faFire',
    success: 'faCheck',
    question: 'faQuestion'
  }

  return (
    <div className={clsx('flex items-center font-semibold gap-3 text-black')}>
      {!disableIcon && (
        <div className="max-w-[17px] min-w-[17px]">
          <Icon name={iconMap[variant]} />
        </div>
      )}
      <div
        onClick={() => {
          hasContent && setShow && setShow(!show)
        }}
        className={clsx(
          {'cursor-pointer items-center flex': hasContent},
          'grow'
        )}>
        <div className="grow">{children}</div>
        {hasContent && (
          <Icon name={show ? 'faChevronDown' : 'faChevronRight'} />
        )}
      </div>
    </div>
  )
}

export const Content = ({children}: ChildProps) => {
  const context = useContext(AdmonitionContext)
  const {show, disableIcon, setHasContent} = context

  useEffect(() => {
    if (children && setHasContent) {
      setHasContent(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children])

  return (
    <>
      {show && (
        <div className={clsx({'ml-[29px]': !disableIcon}, 'mt-3')}>
          {children}
        </div>
      )}
    </>
  )
}

Admonition.Title = Title
Admonition.Content = Content

Admonition.Title.displayName = 'Admonition.Title'
Admonition.Content.displayName = 'Admonotion.Content'

export default Admonition
