import {
  faBookUser,
  faCertificate,
  faPerson
} from '@fortawesome/pro-duotone-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {SiGithub, SiLinkedin} from 'react-icons/si'
import Link from 'next/link'
import HeadDropDown from './DropDown'
import {NavItemsT} from '@/types'

export const NavItems: NavItemsT[] = [
  {
    title: 'Home',
    entries: [
      {
        title: 'Über mich',
        href: '/#about',
        icon: <FontAwesomeIcon icon={faPerson} fixedWidth />
      },
      {
        title: 'Zertifikate',
        href: '/#certs',
        icon: <FontAwesomeIcon icon={faCertificate} fixedWidth />
      },
      {
        title: 'Berufserfahrung',
        href: '/#experience',
        icon: <FontAwesomeIcon icon={faBookUser} fixedWidth />
      }
    ]
  },
  {title: 'Knowledgebase', href: '/kb'}
]

export const NavEntries = ({...props}: JSX.IntrinsicElements['li']) => {
  return (
    <>
      {NavItems.map(item => {
        return (
          <li key={item.title} {...props}>
            {item.entries && (
              <HeadDropDown button={item.title} entries={item.entries} />
            )}
            {item.href && <Link href={item.href}>{item.title}</Link>}
          </li>
        )
      })}
    </>
  )
}

export const SocialIcons = () => {
  return (
    <>
      <Link
        href="https://de.linkedin.com/in/gino-naumann-356993240"
        target="_blank"
        className="hover:text-primary">
        <SiLinkedin size={27} />
      </Link>
      <Link
        href="https://github.com/genaumann"
        className="hover:text-primary"
        target="_blank">
        <SiGithub size={27} />
      </Link>
    </>
  )
}
