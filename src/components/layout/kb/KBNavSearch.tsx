'use client'

import Modal from '@/components/Modal'
import SearchButton from '@/components/SearchButton'
import {useState} from 'react'

const KBNavSearch = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <SearchButton onClick={() => setIsOpen(!isOpen)} className="py-2 mt-3" />
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Die Suche ist noch nicht verfügbar"
        description="Docsearch kommt bald 🚀"
      />
    </>
  )
}

export default KBNavSearch
