import Head from 'next/head'
import KBIndexTree from '@/components/modules/kb/KBIndexTree'
import KBHero from '@/components/modules/kb/KBHero'
import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'GNaumann · Knowledgebase',
  description: 'GNaumann Knowledgebase'
}

const KBIndex = () => {
  return (
    <>
      <Head>
        <title>Knowledgebase · GNaumann</title>
      </Head>
      <KBHero />
      <KBIndexTree />
    </>
  )
}

export default KBIndex
