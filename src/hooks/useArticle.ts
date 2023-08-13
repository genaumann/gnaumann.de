'use client'

import {KBIndex} from '@/types'
import KBIndexJSON from '@/KBIndex.json'
import {usePathname} from 'next/navigation'
import {useEffect, useState} from 'react'
import {findArticleByHref} from '@/utils'

export const useArticle = () => {
  const [article, setArticle] = useState<KBIndex | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    setArticle(findArticleByHref(KBIndexJSON, pathname))
  }, [pathname])

  return {article}
}
