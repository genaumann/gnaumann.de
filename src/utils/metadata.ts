import {basePath} from '@/config'
import {Metadata} from 'next'

export const dynamicMetadata = (
  title: string,
  description: string,
  url: string,
  index: boolean = true
): Metadata => {
  return {
    title,
    description,
    robots: {
      index,
      follow: index,
      googleBot: {
        index,
        follow: index
      }
    },
    metadataBase: new URL(basePath),
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'gnaumann.de',
      images: [
        {
          alt: title,
          type: 'image/png',
          width: 1200,
          height: 630,
          url: `/opengraph/root`
        }
      ]
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
      site: 'gnaumann.de',
      images: [
        {
          alt: title,
          type: 'image/png',
          width: 1200,
          height: 630,
          url: `/opengraph/root`
        }
      ]
    }
  }
}
