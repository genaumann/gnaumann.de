import {formatDate} from '@/utils'
import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faArrowUpRightFromSquare,
  faCalendar,
  faCertificate
} from '@fortawesome/pro-duotone-svg-icons'
import Badge from '@/components/Badge'
import SimpleIcon from '@/components/icons/SimpleIcon'

const certs = [
  {
    name: 'ITIL® Foundation Certificate in IT Service Management',
    issuer: 'PeopleCert',
    issuedAt: '2023-11-16',
    validUntil: '2026-11-16',
    link: 'https://media.licdn.com/dms/image/D4E2DAQFmagSGx06QQA/profile-treasury-document-images_1280/1/1700224345657?e=1701302400&v=beta&t=bHa5CXgOdB3Asdp9lDfXkG2PsTJSP1SqlX4OMKbRAco'
  },
  {
    name: 'Professional Scrum Master™ I (PSM I)',
    issuer: 'Scrum.org',
    issuedAt: '2023-06-20',
    link: 'https://www.credly.com/badges/3f9e550f-a9be-4ed2-973e-543480ff1902'
  },
  {
    name: 'Red Hat® Certified System Administrator (RHCSA®)',
    issuer: 'Red Hat',
    issuedAt: '2023-06-08',
    validUntil: '2026-06-07',
    link: 'https://www.credly.com/badges/f2d2d2a5-fa70-473f-840b-9eccfb85fa04',
    icon: 'redhat'
  }
]

interface checkValidProps {
  validUntil: string
}

const checkValid = ({validUntil}: checkValidProps) => {
  const untildDate = new Date(validUntil)
  const nowDate = new Date()

  const millisecondsPerDay = 24 * 60 * 60 * 1000
  const diffInMilliseconds = untildDate.getTime() - nowDate.getTime()
  const diffInDays = Math.floor(diffInMilliseconds / millisecondsPerDay)

  return {
    valid: diffInMilliseconds >= 0,
    daysValid: diffInDays.toString()
  }
}

const Certs = () => {
  return (
    <>
      <div className="flex flex-wrap items-center mt-10 gap-x-10">
        <h2 className="grow text-4xl text-center">Zertifikate</h2>
        <ul
          role="list"
          className="flex-auto divide-y divide-secondary/60 bg-gray-200 rounded-xl px-4">
          {certs.map(cert => {
            const valid = cert.validUntil ? checkValid(cert).valid : true
            return (
              <li
                key={cert.link}
                className="flex justify-between gap-x-6 py-5 items-center">
                <div className="flex gap-x-4 items-center max-w-[250px] sm:max-w-[350px] md:max-w-none">
                  {cert.icon ? (
                    <SimpleIcon
                      className="shrink-0"
                      name={cert.icon}
                      size={29}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCertificate}
                      fixedWidth
                      size="xl"
                    />
                  )}
                  <div className="min-w-0 flex-auto">
                    <Link
                      href={cert.link}
                      className="text-xl hover:text-primary"
                      target="__blank">
                      {cert.name}
                      <FontAwesomeIcon
                        icon={faArrowUpRightFromSquare}
                        fixedWidth
                        className="!align-super"
                        size="2xs"
                      />
                    </Link>
                    <p className="text-slate-400">{cert.issuer}</p>
                  </div>
                </div>
                <div>
                  {valid ? (
                    <Badge className="mr-2" variant="success">
                      Gültig
                    </Badge>
                  ) : (
                    <Badge className="mr-2" variant="danger">
                      Abgelaufen
                    </Badge>
                  )}
                  <Badge variant="info">
                    <FontAwesomeIcon icon={faCalendar} fixedWidth />
                    {formatDate(cert.issuedAt)}
                  </Badge>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default Certs
