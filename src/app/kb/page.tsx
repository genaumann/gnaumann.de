import KBIndexTree from '@/components/modules/kb/KBIndexTree'
import KBHero from '@/components/modules/kb/KBHero'
import {Metadata} from 'next'
import {dynamicMetadata} from '@/utils/metadata'

const title = 'GNaumann · Knowledgebase'
const description =
  'GNaumann Knowledgebase :: Artikel zu verschiedenen IT-Themen'

export const metadata: Metadata = dynamicMetadata(
  title,
  description,
  '/kb',
  true
)

const KBIndex = () => {
  return (
    <>
      <KBHero />
      <KBIndexTree />
    </>
  )
}

export default KBIndex
