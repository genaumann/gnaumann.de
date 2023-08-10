'use client'

import {calculateRelativeTime, findArticleByHref} from '@/utils'
import KBIndex from '@/KBIndex.json'
import {usePathname} from 'next/navigation'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faFilePen,
  faFilePlus,
  faUserPen
} from '@fortawesome/pro-duotone-svg-icons'

const KBMeta = () => {
  const pathname = usePathname()
  const article = findArticleByHref(KBIndex, pathname)

  if (article) {
    const createAgo = calculateRelativeTime(article.createDate)
    const modifyAgo = calculateRelativeTime(article.modifyDate)

    return (
      <>
        {article && (
          <div className="block sm:flex space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex gap-2">
              <FontAwesomeIcon
                className="min-w-[30px] sm:min-w-0"
                size="xl"
                icon={faFilePlus}
              />
              vor {createAgo}
            </div>
            <div className="flex gap-2">
              <FontAwesomeIcon
                className="min-w-[30px] sm:min-w-0"
                size="xl"
                icon={faFilePen}
              />
              vor {modifyAgo}
            </div>
            <div className="flex gap-2">
              <FontAwesomeIcon
                className="min-w-[30px] sm:min-w-0"
                size="xl"
                icon={faUserPen}
              />
              {article.author}
            </div>
          </div>
        )}
      </>
    )
  }

  return <></>
}

export default KBMeta
