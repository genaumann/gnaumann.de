'use client'

import {KBIndex} from '@/types'
import {
  faBookOpenReader,
  faChevronDown,
  faChevronRight
} from '@fortawesome/pro-duotone-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import Link from 'next/link'
import {useEffect, useState} from 'react'
import navigation from '@/KBIndex.json'
import styles from '@/styles/kbindex.module.css'

const KBIndexNode = ({node}: {node: KBIndex}) => {
  const [icon, setIcon] = useState<JSX.Element>()
  const [isOpen, setIsOpen] = useState(true)

  const handleToggle = (event: React.SyntheticEvent<HTMLDetailsElement>) => {
    setIsOpen(event.currentTarget.open)
  }

  useEffect(() => {
    if (isOpen) {
      setIcon(
        <FontAwesomeIcon
          className="float-right"
          icon={faChevronDown}
          fixedWidth
        />
      )
    } else {
      setIcon(
        <FontAwesomeIcon
          className="float-right"
          icon={faChevronRight}
          fixedWidth
        />
      )
    }
  }, [isOpen])

  return (
    <li className="text-xl">
      <details open={isOpen} onToggle={handleToggle}>
        <summary>
          <Link
            className={clsx(node.children && 'font-bold', 'hover:text-primary')}
            href={node.href}>
            {node.title}
          </Link>
          {node.children && icon}
        </summary>
        {node.children && (
          <ul className="space-y-4">
            {node.children.map((childNode, index) => (
              <KBIndexNode key={index} node={childNode} />
            ))}
          </ul>
        )}
      </details>
    </li>
  )
}

const KBIndexTree = () => {
  return (
    <nav className="mt-3 max-w-[734px] md:mx-auto">
      <ul role="list" className={clsx(styles.tree)}>
        <li className="!pl-3">
          <details open>
            <summary
              onClick={e => e.preventDefault()}
              className="text-3xl font-bold">
              <FontAwesomeIcon icon={faBookOpenReader} fixedWidth />
            </summary>
            <ul
              role="list"
              className={clsx('bg-gray-200 rounded-xl space-y-4 mt-4 p-4')}>
              {navigation.map((node, index) => (
                <KBIndexNode key={index} node={node} />
              ))}
            </ul>
          </details>
        </li>
      </ul>
    </nav>
  )
}

export default KBIndexTree
