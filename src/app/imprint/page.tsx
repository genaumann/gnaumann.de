import {getMDXByPath, mdxOptions} from '@/utils/mdx'
import {Metadata} from 'next'
import {MDXRemote} from 'next-mdx-remote/rsc'
import {dynamicMetadata} from '@/utils/metadata'

const title = 'GNaumann · Impressum'
const description = 'GNaumann Impressum'

export const metadata: Metadata = dynamicMetadata(
  title,
  description,
  '/imprint',
  false
)

const Imprint = async () => {
  const imprint = await getMDXByPath('app/imprint/imprint.mdx')
  return (
    <main className="prose">
      <MDXRemote source={imprint} options={{mdxOptions}} />
    </main>
  )
}

export default Imprint
