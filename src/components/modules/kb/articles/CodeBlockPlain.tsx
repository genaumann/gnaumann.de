import {ReactNode} from 'react'

export interface CodeBlockPlainProps {
  children?: ReactNode
  title?: string
}

const CodeBlockPlain: React.FC<CodeBlockPlainProps> = ({children}) => {
  return (
    <div className="w-full not-prose shadow-lg mt-3">
      <div className="bg-gray-200 rounded-xl py-2 px-4 overflow-auto whitespace-pre-line leading-normal">
        {children}
      </div>
    </div>
  )
}

export default CodeBlockPlain
