'use client'

import TreeView, {flattenTree} from 'react-accessible-treeview'
import {INode, NodeId} from 'react-accessible-treeview/dist/TreeView/types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronDown, faChevronRight} from '@fortawesome/pro-duotone-svg-icons'
import {useEffect, useState} from 'react'
import clsx from 'clsx'
import {convertIndexTree} from '@/utils'
import {KBNavProps} from '@/types'
import Link from 'next/link'
import {usePathname} from 'next/navigation'

const setExpandedIds = (currentUrl: string, nodes: INode[]): NodeId[] => {
  const ancestors: NodeId[] = []

  const addNode = (nodeId: string | number | null): void => {
    if (nodeId === null) return

    const node = nodes.find(node => node.id === nodeId)
    if (node && node.parent !== null) {
      ancestors.push(node.id)
      addNode(node.parent)
    }
  }

  const currentNode = nodes.find(node => node.id === currentUrl)
  if (currentNode && currentUrl.endsWith('/index')) {
    addNode(currentNode.id)
  }
  if (currentNode) {
    addNode(currentNode.parent)
  }

  return ancestors
}

const ChildIcon = ({isOpen}: {isOpen: boolean}) =>
  isOpen ? (
    <FontAwesomeIcon icon={faChevronDown} fixedWidth />
  ) : (
    <FontAwesomeIcon icon={faChevronRight} fixedWidth />
  )

const KBNav = ({index}: KBNavProps) => {
  const [expandIds, setExpandIds] = useState<NodeId[]>([])
  const pathname = usePathname()

  const dataTree = flattenTree({
    name: '',
    children: index.map(convertIndexTree)
  })

  useEffect(() => {
    setExpandIds([...setExpandedIds(pathname, dataTree), ...expandIds])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <nav className="not-prose mt-3">
      <TreeView
        data={dataTree}
        expandedIds={expandIds}
        className="space-y-1"
        expandOnKeyboardSelect
        onExpand={({element, isExpanded}) => {
          isExpanded
            ? setExpandIds([...expandIds, element.id])
            : setExpandIds(expandIds.filter(elem => elem !== element.id))
        }}
        nodeRenderer={({
          element,
          isBranch,
          isExpanded,
          getNodeProps,
          level
        }) => {
          const textCss = {
            'text-slate-300/80': !isBranch && pathname !== element.id,
            'text-slate-300': isBranch && pathname !== element.id,
            'text-primary': pathname === element.id,
            'font-bold': isBranch
          }
          const levelCss = {
            'pl-4': level === 2,
            'ml-4 pl-4': level === 3,
            'pl-12': level === 4,
            'border-l border-secondary py-1': level > 1,
            'border-primary': level > 1 && pathname === element.id
          }
          return (
            <>
              {level > 2 ? (
                <div
                  {...getNodeProps()}
                  className={clsx(
                    'border-l border-secondary space-x-1 space-y-2'
                  )}>
                  <div className={clsx(levelCss, 'space-x-1 space-y-2')}>
                    <Link
                      className={clsx(textCss)}
                      href={typeof element.id === 'string' ? element.id : ''}>
                      {element.name}
                    </Link>
                    {isBranch && <ChildIcon isOpen={isExpanded} />}
                  </div>
                </div>
              ) : (
                <div
                  {...getNodeProps()}
                  className={clsx(levelCss, 'space-x-1 space-y-2')}>
                  <Link
                    className={clsx(textCss)}
                    href={typeof element.id === 'string' ? element.id : ''}>
                    {element.name}
                  </Link>
                  {isBranch && <ChildIcon isOpen={isExpanded} />}
                </div>
              )}
            </>
          )
        }}
      />
    </nav>
  )
}

export default KBNav
