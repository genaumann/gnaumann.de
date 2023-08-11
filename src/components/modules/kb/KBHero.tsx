import SearchButton from '@/components/SearchButton'

const KBHero = () => {
  return (
    <div className="my-12 sm:py-32">
      <div className="sm:mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="sm:mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Knowledgebase
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-500">
            Hier findest Du Artikel zu verschiedenen Softwares und IT-Themen.
            Die Artikel werden lediglich in deutscher Sprache verfasst und
            werden regelmäßig aktualisiert.
          </p>
          <SearchButton location="body" className="py-4 text-xl mt-3" />
        </div>
      </div>
    </div>
  )
}
export default KBHero
