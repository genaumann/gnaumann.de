import {getMDXByPath} from '@/utils/mdx'

const Imprint = () => {
  const imprint = getMDXByPath('app/imprint/imprint.mdx')
  return <main className="prose">{imprint}</main>
}

export default Imprint
