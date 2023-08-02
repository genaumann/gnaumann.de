'use client'

import {faMagnifyingGlass, faSearch} from '@fortawesome/pro-regular-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import Modal from './Modal'
import {useState} from 'react'

interface SearchButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  location: 'header' | 'body'
}

const SearchButton: React.FC<SearchButtonProps> = ({
  className,
  location,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button
        {...props}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Suchen"
        className={clsx(
          {
            'bg-gray-200 min-w-full rounded-xl': location === 'body'
          },
          className
        )}>
        {location === 'body' ? (
          <>
            <FontAwesomeIcon className="mr-3" icon={faSearch} fixedWidth />
            Suchen
          </>
        ) : (
          <FontAwesomeIcon className="text-2xl" icon={faMagnifyingGlass} />
        )}
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
