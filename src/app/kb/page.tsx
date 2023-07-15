'use client'

import {KBIndex} from '@/types'
import clsx from 'clsx'
import navigation from '@/KBIndex.json'
import Link from 'next/link'
import styles from '@/styles/kbindex.module.css'
import {useEffect, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faBookOpenReader,
  faChevronDown,
  faChevronRight
} from '@fortawesome/pro-duotone-svg-icons'
import Head from 'next/head'
import Modal from '@/components/Modal'
import SearchButton from '@/components/SearchButton'

const TreeNode = ({node}: {node: KBIndex}) => {
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
              <TreeNode key={index} node={childNode} />
            ))}
          </ul>
        )}
      </details>
    </li>
  )
}

const KBIndex = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Head>
        <title>Knowledgebase · GNaumann</title>
      </Head>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mx-auto text-center md:text-left mt-3">
          <h1 className="text-3xl">Knowledgebase</h1>
          <p className="text-slate-500 mt-3">
            Hier findest Du nützliche Artikel zu verschiedenen Themen und
            Softwares. Die Artikel werden lediglich in deutscher Sprache
            geschrieben. Verbesserungen können gern per GitHub übermittelt
            werden.
          </p>
          <SearchButton
            onClick={() => setIsOpen(!isOpen)}
            className="py-4 text-xl mt-3"
          />
          <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Die Suche ist noch nicht verfügbar"
            description="Docsearch kommt bald 🚀"
          />
        </div>
        <div className="md:mt-3">
          <nav className="not-prose mt-3 md:flex-grow max-w-[734px] md:mr-0 md:ml-auto">
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
                    className={clsx(
                      'bg-gray-200 rounded-xl space-y-4 mt-4 p-4'
                    )}>
                    {navigation.map((node, index) => (
                      <TreeNode key={index} node={node} />
                    ))}
                  </ul>
                </details>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

export default KBIndex
