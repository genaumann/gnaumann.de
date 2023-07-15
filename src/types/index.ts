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
  children?: KBIndex[]
}
