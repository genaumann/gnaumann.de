import Head from 'next/head'
import KBIndexTree from '@/components/modules/kb/KBIndexTree'
import KBHero from '@/components/modules/kb/KBHero'

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
