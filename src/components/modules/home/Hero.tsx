'use client'

import {useEffect, useRef, useState} from 'react'
import CodeWindow from './CodeWindow'
import Typed from 'typed.js'
import hljs from 'highlight.js'
import typescript from 'highlight.js/lib/languages/typescript'
import {calcAge} from '@/utils'
import SimpleIcon from '@/components/icons/SimpleIcon'

hljs.registerLanguage('typescript', typescript)

const IconMap = [
  {name: 'Salt', icon: <SimpleIcon name="salt" />},
  {name: 'Ansible', icon: <SimpleIcon name="ansible" />},
  {name: 'Gitlab', icon: <SimpleIcon name="gitlab" />},
  {name: 'React', icon: <SimpleIcon name="react" />},
  {name: 'Icinga', icon: <SimpleIcon name="icinga" color={undefined} />},
  {name: 'Kubernetes', icon: <SimpleIcon name="kubernetes" />},
  {name: 'Docker', icon: <SimpleIcon name="docker" />},
  {name: 'Git', icon: <SimpleIcon name="git" />},
  {name: 'Debian', icon: <SimpleIcon name="debian" />}
]

const codeString = hljs.highlight(
  `const calcAge = (birthdate: Date): number => {
  const today = new Date()
  const birthYear = birthdate.getFullYear()
  const birthMonth = birthdate.getMonth()
  const birthDay = birthdate.getDate()
  
  let age = today.getFullYear() - birthYear
  const monthDifference = today.getMonth() - birthMonth
  
  if (
    monthDifference < 0
    || (monthDifference === 0 && today.getDate() < birthDay)
  ) {
    age--
  }
  
  return age
}

const name = 'Gino Naumann'
console.log(\`Hello my name is \${name}.\`)
console.log(\`I am \${calcAge(new Date('1998-08-09'))} years old.\`)`,
  {language: 'typescript'}
).value

export default function Hero() {
  const [icon, setIcon] = useState<JSX.Element | undefined>(undefined)
  const typedSoftwares = useRef(null)
  const typedCode = useRef(null)

  useEffect(() => {
    console.log('Hello my name is Gino Naumann')
    console.log(`I am ${calcAge(new Date('1998-08-09'))} years old.`)
    const softwares = new Typed(typedSoftwares.current, {
      strings: IconMap.map(element => element.name),
      typeSpeed: 50,
      smartBackspace: true,
      loop: true,
      backSpeed: 50,
      backDelay: 5000,
      loopCount: Infinity,
      showCursor: false,
      onStringTyped(arrayPos) {
        setIcon(IconMap[arrayPos].icon)
        setTimeout(() => {
          setIcon(undefined)
        }, 5000)
      }
    })

    return () => {
      softwares.destroy()
    }
  }, [])

  useEffect(() => {
    const code = new Typed(typedCode.current, {
      strings: [codeString],
      typeSpeed: 6,
      smartBackspace: true,
      contentType: 'html',
      showCursor: false
    })

    return () => {
      code.destroy()
    }
  }, [])

  return (
    <div id="hero" className="flex items-center mt-3">
      <div className="grow space-y-2">
        <h1 className="font-extrabold text-transparent bg-gradient-to-r from-primary via-indigo-500 to-pink-500 bg-clip-text text-6xl mb-6">
          Gino Naumann
        </h1>
        <div className="flex gap-2 min-h-[40px] text-4xl not-prose">
          <h2 ref={typedSoftwares} />
          {icon}
        </div>
      </div>
      <CodeWindow className="hidden md:flex w-[638.3px]">
        <CodeWindow.Code maxLines={codeString.split('\n').length + 1}>
          <div ref={typedCode} />
        </CodeWindow.Code>
      </CodeWindow>
    </div>
  )
}
