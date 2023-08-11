import {ChildProps} from '@/types'
import {FC} from 'react'
import Icon from './Icons'
import Link from 'next/link'
import clsx from 'clsx'

interface GridItemProps extends ChildProps {
  title: string
  icon?: string
  iconSize?: string
  href?: string
}

export const Grid = ({children}: ChildProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
      {children}
    </div>
  )
}

export const GridItem: FC<GridItemProps> = ({
  title,
  icon,
  iconSize,
  href,
  children
}) => {
  const gridItem = (
    <div
      className={clsx('border relative border-secondary/60 rounded-md p-4', {
        'hover:border-primary': href
      })}>
      {icon && <Icon className="mb-3" size={iconSize} name={icon}></Icon>}
      {title && <strong className="text-xl">{title}</strong>}
      <div className="text-slate-500">{children}</div>
    </div>
  )

  return (
    <>
      <div
        className={clsx('border relative border-secondary/60 rounded-md p-4', {
          'hover:ring hover:ring-primary': href
        })}>
        {icon && <Icon className="mb-3" size={iconSize} name={icon}></Icon>}
        {title && <strong className="text-xl">{title}</strong>}
        {href && (
          <Link href={href}>
            <span className="absolute -inset-px rounded-md" />
          </Link>
        )}
        <div className="text-slate-500">{children}</div>
      </div>
    </>
  )
}
