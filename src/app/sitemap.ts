import {MetadataRoute} from 'next'
import fs from 'fs'
import path from 'path'
import {sync as globSync} from 'glob'
import KBIndexJSON from '@/KBIndex.json'
import {KBIndex} from '@/types'
import {basePath} from '@/config'

interface SiteMapObject {
  path: string
  lastModified: string | Date
}

const sitemap = (): MetadataRoute.Sitemap => {
  const findPages = (startPath: string): SiteMapObject[] => {
    const pattern = '**/page.tsx'

    let files = globSync(pattern, {
      cwd: startPath,
      ignore: ['**/imprint/page.tsx']
    })

    files = files.filter(file => {
      const relativePath = path.relative(startPath, file)
      const parts = relativePath.split(path.sep)
      return !parts.some(part => part === '[...kb]' || part === '[kb]')
    })

    return files.map(file => {
      const absolutePath = path.resolve(startPath, file)
      const stats = fs.statSync(absolutePath)
      const relativePath = path.relative(
        path.join(startPath, 'src/app'),
        absolutePath
      )

      return {
        path:
          '/' +
          relativePath
            .replace(/\\/g, '/')
            .replace('page.tsx', '')
            .replace(/\/$/g, ''),
        lastModified: stats.mtime
      }
    })
  }

  const mapKBArticles = (KBIndex: KBIndex[]): SiteMapObject[] => {
    let result: SiteMapObject[] = []

    for (const index of KBIndex) {
      result.push({path: index.href, lastModified: index.modifyDate})

      if (index.children) {
        result = result.concat(mapKBArticles(index.children))
      }
    }

    return result
  }

  const staticPages = findPages('.')
  const kbArticles = mapKBArticles(KBIndexJSON)

  return [...staticPages, ...kbArticles].map(entry => {
    return {
      url: `${basePath}${entry.path}`,
      lastModified: new Date(entry.lastModified).toISOString()
    }
  })
}

export default sitemap
