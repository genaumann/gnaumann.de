'use client'

import {faSearch} from '@fortawesome/pro-regular-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import Modal from './Modal'
import {useState} from 'react'

const SearchButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button
        {...props}
        onClick={() => setIsOpen(!isOpen)}
        className={clsx('bg-gray-200 min-w-full rounded-xl', className)}>
        <FontAwesomeIcon className="mr-3" icon={faSearch} fixedWidth />
        Suchen
      </button>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Die Suche ist noch nicht verfügbar"
        description="Docsearch kommt bald 🚀"
      />
    </>
  )
}

export default SearchButton
