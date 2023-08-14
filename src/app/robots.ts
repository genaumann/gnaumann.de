import {basePath} from '@/config'
import {MetadataRoute} from 'next'

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: `${basePath}/sitemap.xml`
  }
}

export default robots
