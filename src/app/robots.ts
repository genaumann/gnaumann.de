import {basePath} from '@/config'
import {MetadataRoute} from 'next'

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/imprint'
    },
    sitemap: `${basePath}/sitemap.xml`
  }
}

export default robots
