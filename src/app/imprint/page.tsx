import {getMDXByPath, mdxOptions} from '@/utils/mdx'
import {MDXRemote} from 'next-mdx-remote/rsc'

const Imprint = async () => {
  const imprint = await getMDXByPath('app/imprint/imprint.mdx')
  return (
    <main className="prose">
      <MDXRemote source={imprint} options={{mdxOptions}} />
    </main>
  )
}

export default Imprint
