import {getMDXByPath, mdxOptions} from '@/utils/mdx'
import {Metadata} from 'next'
import {MDXRemote} from 'next-mdx-remote/rsc'

export const metadata: Metadata = {
  title: 'GNaumann · Impressum',
  description: 'GNaumann Impressum',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false
    }
  }
}

const Imprint = async () => {
  const imprint = await getMDXByPath('app/imprint/imprint.mdx')
  return (
    <main className="prose">
      <MDXRemote source={imprint} options={{mdxOptions}} />
    </main>
  )
}

export default Imprint
