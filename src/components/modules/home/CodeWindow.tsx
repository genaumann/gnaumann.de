import useResizeObserver from '@/hooks/useResizeObserver'
import clsx from 'clsx'
import React, {useEffect, useRef, useState} from 'react'

interface CodeWindowCodeProps extends React.HTMLAttributes<HTMLDivElement> {
  maxLines?: number
}

const CodeWindow = ({children, className}: JSX.IntrinsicElements['div']) => {
  return (
    <div
      className={clsx(
        'overflow-hidden shadow-xl flex max-h-[60vh] sm:max-h-[none] rounded-xl bg-gray-200/70 backdrop-blur ring-1 ring-inset ring-black/10',
        className
      )}>
      <div className="w-full flex flex-col not-prose">
        <div className={'flex-none border-b border-slate-500/30'}>
          <div className="flex items-center h-8 space-x-1.5 px-3">
            <div className="w-2.5 h-2.5 bg-red-600 rounded-full" />
            <div className="w-2.5 h-2.5 bg-yellow-600 rounded-full" />
            <div className="w-2.5 h-2.5 bg-green-600 rounded-full" />
          </div>
        </div>
        <div className="min-h-0 flex-auto flex flex-col">{children}</div>
      </div>
    </div>
  )
}

const Code = ({children, maxLines}: CodeWindowCodeProps) => {
  const [lineNum, setLineNum] = useState<Array<number>>([1])
  const ref = useRef(null)
  const dimension = useResizeObserver(ref)
  useEffect(() => {
    if (dimension) {
      if ((maxLines && lineNum.length < maxLines) || !maxLines) {
        setLineNum(lineNum => [...lineNum, lineNum[lineNum.length - 1] + 1])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dimension?.height])

  return (
    <div className="w-full flex-auto flex min-h-0 overflow-auto">
      <div className="w-full flex-auto">
        <pre className="flex min-h-full text-sm leading-6">
          <div
            aria-hidden="true"
            className="hidden md:block text-slate-600 flex-none py-4 pr-4 text-right select-none w-[50px]">
            {lineNum.join('\n')}
          </div>
          <code className="flex-auto block text-slate-50 pt-4 pb-4 px-4 overflow-auto">
            <div className="text-black" ref={ref}>
              {children}
            </div>
          </code>
        </pre>
      </div>
    </div>
  )
}

Code.displayName = 'Code'
CodeWindow.Code = Code

export default CodeWindow
