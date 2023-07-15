import {faSearch} from '@fortawesome/pro-regular-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import clsx from 'clsx'

const SearchButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx('bg-gray-200 min-w-full rounded-xl', className)}>
      <FontAwesomeIcon className="mr-3" icon={faSearch} fixedWidth />
      Suchen
    </button>
  )
}

export default SearchButton
