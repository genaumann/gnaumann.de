import Image from 'next/image'
import icke from '@pub/icke.png'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faArrowDownRight,
  faAt,
  faCakeCandles,
  faHouse,
  faSignature
} from '@fortawesome/pro-duotone-svg-icons'
import clsx from 'clsx'
import {calcAge} from '@/utils'

const mail = 'job@gnaumann.de'

const info = [
  {
    id: 'name',
    icon: faSignature,
    value: 'Gino'
  },
  {
    id: 'age',
    icon: faCakeCandles,
    value: calcAge(new Date('1998-08-09'))
  },
  {
    id: 'city',
    icon: faHouse,
    value: 'Berlin'
  },
  {
    id: 'mail',
    icon: faAt,
    value: mail,
    href: `mailto:${mail}`
  }
]

export default function About() {
  return (
    <>
      <div className="ml-auto not-prose">
        <h2 className="text-4xl font-bold">Der bin ich</h2>
        <FontAwesomeIcon size="3x" className="ms-8" icon={faArrowDownRight} />
      </div>
      <div className="flex flex-wrap">
        <Image height={800} src={icke} alt="Icke" />
        <div className="mx-auto mt-3 h-fit w-full md:w-fit grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-200 rounded-lg px-3 py-4 self-center">
          {info.map((element, index) => {
            return (
              <div
                key={element.id}
                className={clsx('flex text-2xl gap-4', {
                  'sm:flex-row-reverse': index % 2
                })}>
                <FontAwesomeIcon icon={element.icon} size="lg" fixedWidth />
                {element.href ? (
                  <a href={element.href}>{element.value}</a>
                ) : (
                  <div>{element.value}</div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
