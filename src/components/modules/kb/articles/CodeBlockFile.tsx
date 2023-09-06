'use client'

import {ReactNode, useRef, useState} from 'react'
import Icon from './Icons'
import '@/styles/highlight.css'

export interface CodeBlockFileProps {
  children?: ReactNode
  title?: string
  line: number
  showLine?: string
  language?: string
}

const iconMap = (lang: string) => {
  if (lang === 'js' || lang === 'javascript') {
    return 'siJavascript'
  }
  if (lang === 'ts' || lang === 'typescript') {
    return 'siTypescript'
  }
  if (lang === 'bash') {
    return 'siGnubash'
  }
  if (lang === 'yaml' || 'yml') {
    return 'siYaml'
  }
  return 'faFile'
}

const CodeBlockFile: React.FC<CodeBlockFileProps> = ({
  children,
  title,
  line,
  showLine = 'true',
  language
}) => {
  const [icon, setIcon] = useState('faCopy')
  const codeRef = useRef<HTMLDivElement>(null)
  const lineArr = Array.from({length: line}, (_, i) => i + 1)

  const handleCopy = () => {
    const content = codeRef.current?.innerText
    if (content) {
      navigator.clipboard
        .writeText(content)
        .then(() => {
          setIcon('faCheck')
          setTimeout(() => {
            setIcon('faCopy')
          }, 4000)
        })
        .catch(() => {
          setIcon('faTriangleExclamation')
          setTimeout(() => {
            setIcon('faCopy')
          }, 4000)
        })
    }
  }

  return (
    <div className="w-full not-prose shadow-lg mt-3">
      <div className="w-full bg-gray-200/50 rounded-t-xl flex items-center">
        <div className="w-fit rounded-t-xl px-4 py-2 bg-gray-200 border-b border-primary flex items-center gap-2">
          {language && <Icon name={iconMap(language)} />}
          {title && <div className="text-primary">{title}</div>}
        </div>
        {typeof navigator !== 'undefined' && navigator.clipboard && (
          <div
            title="Copy"
            onClick={() => handleCopy()}
            className="mr-3 ml-auto cursor-pointer">
            <Icon name={icon} size="lg" />
          </div>
        )}
      </div>
      <div className="bg-gray-200 rounded-b-xl py-2 px-4 flex overflow-auto whitespace-pre-line gap-3 relative">
        {showLine === 'true' && (
          <div className="pr-3 text-slate-600 border-r border-secondary/60 select-none">
            {lineArr.join('\n')}
          </div>
        )}
        <div className="grow" ref={codeRef}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default CodeBlockFile
