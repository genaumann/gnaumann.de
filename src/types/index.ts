import {ReactNode} from 'react'

export type NavItemsT = {
  title: string
  href?: string
  icon?: ReactNode
  entries?: NavItemsT[]
}

export type KBHeadings = {
  level: number
  title: string
  id: string
  children: KBHeadings[]
}

export type KBIndex = {
  title: string
  author: string
  href: string
  head: boolean
  description: string
  level: number
  sort?: number
  createDate: string
  modifyDate: string
  headings: KBHeadings[]
  icons?: string[]
  children?: KBIndex[]
}

export type KBLayout = {
  params: {
    kb: string[]
  }
}

export type RequestContext<N extends string, T = unknown> = {
  params: {
    [K in N]: T
  }
}

export interface ChildProps {
  children: ReactNode
}

export interface KBLayoutProps extends ChildProps, KBLayout {}

export interface KBNavProps {
  index: KBIndex[]
}
