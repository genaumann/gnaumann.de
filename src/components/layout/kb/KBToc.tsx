'use client'

import Link from 'next/link'
import {KBHeadings} from '@/types'
import clsx from 'clsx'
import useTableOfContents from '@/hooks/useToc'
import {useArticle} from '@/hooks/useArticle'

interface TocTreeProps {
  tree: KBHeadings[]
  headerID: string | null
}

interface TocNodeProps {
  node: KBHeadings
  headerID: string | null
}

const TocTree = ({tree, headerID}: TocTreeProps) => {
  return (
    <div className="space-y-3">
      {tree.map(section => {
        return <TocNode headerID={headerID} key={section.id} node={section} />
      })}
    </div>
  )
}

const TocNode = ({node, headerID}: TocNodeProps) => {
  return (
    <>
      <div
        className={clsx(
          {
            'pl-4': node.level === 3,
            'pl-8': node.level === 4,
            'pl-12': node.level === 5
          },
          'mb-4'
        )}
        key={node.id}>
        <Link
          className={clsx({
            'text-primary': node.id === headerID
          })}
          href={`#${node.id}`}>
          {node.title}
        </Link>
      </div>
      {node.children.length > 0 && (
        <TocTree headerID={headerID} tree={node.children} />
      )}
    </>
  )
}

const KBToc = () => {
  const {article} = useArticle()
  const headerID = useTableOfContents(article?.headings || [])

  return (
    <>
      {article && article.headings.length > 0 && (
        <>
          <p className="font-bold mb-3">Auf dieser Seite</p>
          <TocTree headerID={headerID} tree={article.headings} />
        </>
      )}
    </>
  )
}

export default KBToc
