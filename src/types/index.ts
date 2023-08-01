import {ReactNode} from 'react'

export type NavItemsT = {
  title: string
  href?: string
  icon?: ReactNode
  entries?: NavItemsT[]
}

export type KBIndex = {
  title: string
  href: string
  head: boolean
  description: string
  level: number
  sort?: number
  createDate: string
  modifyDate: string
  icons?: string[]
  children?: KBIndex[]
}

export type KBLayout = {
  params: {
    kb: string[]
  }
}

export interface ChildProps {
  children: ReactNode
}

export interface KBLayoutProps extends ChildProps, KBLayout {}

export interface KBNavProps {
  index: KBIndex[]
}
