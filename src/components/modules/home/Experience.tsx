import {faCalendar} from '@fortawesome/pro-duotone-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import SimpleIcon from '@/components/icons/SimpleIcon'
import Badge from '@/components/Badge'

const positions = [
  {
    id: 7,
    job: 'DevOps Engineer',
    type: 'Teilzeit',
    company: 'leasyro GmbH',
    department: 'DevOps',
    from: '2023-04-01',
    icons: ['typescript', 'react', 'github']
  },
  {
    id: 6,
    job: 'System Engineer',
    type: 'Vollzeit',
    company: 'SVA Systemvertrieb Alexander GmbH',
    department: 'Infrastructure Automation',
    from: '2023-04-01',
    icons: ['ansible', 'terraform', 'gitlab']
  },
  {
    id: 5,
    job: 'Web-Entwickler',
    type: 'Teilzeit',
    company: 'Deutscher Diabetikerbund e.V.',
    department: 'IT',
    from: '2023-02-01',
    to: '2023-12-31',
    icons: ['javascript', 'react']
  },
  {
    id: 3,
    job: 'Linux Systemadministrator',
    type: 'Vollzeit',
    company: 'Bundesbehörde',
    department: 'IT',
    from: '2021-09-01',
    to: '2023-03-31',
    icons: ['kubernetes', 'mongodb', 'ansible', 'gitlab', 'docker']
  },
  {
    id: 4,
    job: 'System Engineer',
    type: 'Teilzeit',
    company: 'leasyro GmbH',
    department: 'IT',
    from: '2021-09-01',
    to: '2023-01-31',
    icons: ['salt', 'icinga', 'debian', 'docker']
  },
  {
    id: 2,
    job: 'Windows / Linux Systemadministrator',
    type: 'Vollzeit',
    company: 'Freie Universtät Berlin',
    department: 'Universtätsbibliothek',
    from: '2018-12-01',
    to: '2021-08-31',
    icons: ['windows', 'perl', 'salt', 'icinga', 'debian']
  },
  {
    id: 1,
    job: 'Linux Systemadministrator',
    type: 'Vollzeit',
    company: 'Freie Universtät Berlin',
    department: 'ZEDAT',
    from: '2017-07-01',
    to: '2018-11-30',
    icons: ['python', 'git', 'debian']
  }
]

export default function Experience() {
  return (
    <div className="mt-10">
      <h2 className="text-4xl mb-2 text-center">Berufserfahrung</h2>
      <ul role="list" className="grid grid-cols-2 gap-2 lg:gap-3">
        {positions.map(position => {
          const fromDate = new Date(position.from)
          const toDate = position.to ? new Date(position.to) : null
          const dateString = `${fromDate.toLocaleString('default', {
            month: 'short',
            year: 'numeric'
          })} ${toDate ? ' - ' : ''} ${
            toDate
              ? toDate.toLocaleString('default', {
                  month: 'short',
                  year: 'numeric'
                })
              : ''
          }`
          return (
            <li
              className={clsx(
                'bg-gray-200 rounded-2xl pt-10 pb-5 px-8 sm:py-10 col-span-2',
                {
                  'md:col-span-1 ring-2 ring-primary mx-1': !position.to
                }
              )}
              key={position.id}>
              <div className="ms-auto top-1 right-2 max-w-fit mb-3 lg:mb-0 flex gap-2">
                {position.to ? (
                  <Badge variant="danger">Beendet</Badge>
                ) : (
                  <Badge variant="success">Aktiv</Badge>
                )}
                <Badge variant="info">{position.type}</Badge>
              </div>
              <div className="flex flex-col sm:flex-row gap-10">
                <div className="sm:flex-grow">
                  <div className="text-xl">{position.company}</div>
                  <div className="text-slate-400 text-sm italic">
                    {position.department}
                  </div>
                  <h2 className="mt-2">{position.job}</h2>
                  <div className="text-xl">
                    <FontAwesomeIcon icon={faCalendar} fixedWidth />
                    {dateString}
                  </div>
                </div>
                <div className="flex gap-4 sm:items-center">
                  {position.icons.map((iconName, index) => {
                    return (
                      <SimpleIcon
                        key={`${position.id}-${index}`}
                        size={26}
                        name={iconName}
                      />
                    )
                  })}
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
