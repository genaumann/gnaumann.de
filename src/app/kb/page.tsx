import Head from 'next/head'
import SearchButton from '@/components/SearchButton'
import KBIndexTree from '@/components/modules/kb/KBIndexTree'

const KBIndex = () => {
  return (
    <>
      <Head>
        <title>Knowledgebase · GNaumann</title>
      </Head>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mx-auto text-center md:text-left mt-3">
          <h1 className="text-3xl">Knowledgebase</h1>
          <p className="text-slate-500 mt-3">
            Hier findest Du nützliche Artikel zu verschiedenen Themen und
            Softwares. Die Artikel werden lediglich in deutscher Sprache
            geschrieben. Verbesserungen können gern per GitHub übermittelt
            werden.
          </p>
          <SearchButton className="py-4 text-xl mt-3" />
        </div>
        <div className="md:mt-3">
          <KBIndexTree />
        </div>
      </div>
    </>
  )
}

export default KBIndex
