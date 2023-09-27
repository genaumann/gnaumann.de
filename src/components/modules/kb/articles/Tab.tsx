'use client'

export interface TabProps {
  title: string
  children: React.ReactNode
}

const Tab = ({children}: TabProps) => {
  return <div className="mt-3">{children}</div>
}

export default Tab
