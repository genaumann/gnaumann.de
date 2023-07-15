import {ReactNode} from 'react'

export type NavItemsT = {
  title: string
  href?: string
  icon?: ReactNode
  entries?: NavItemsT[]
}
