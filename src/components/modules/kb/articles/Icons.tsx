import {
  FontAwesomeIcon,
  FontAwesomeIconProps
} from '@fortawesome/react-fontawesome'
import {
  faQuestion,
  faBlockQuestion,
  faTriangleExclamation,
  faBolt,
  faFire,
  faCheck,
  faCircleInfo,
  faChevronDown,
  faChevronRight,
  faFile,
  faCopy,
  faKey,
  faBook,
  faCompactDisc
} from '@fortawesome/pro-duotone-svg-icons'
import React from 'react'
import {
  SiAnsible,
  SiJavascript,
  SiMarkdown,
  SiPython,
  SiSaltproject,
  SiTypescript,
  SiGnubash,
  SiGit,
  SiApple,
  SiYaml
} from 'react-icons/si'
import {IconBaseProps} from 'react-icons'

type FaIconProps = Omit<FontAwesomeIconProps, 'icon'>
export interface IconProps extends IconBaseProps {
  name: string
}

type iconMapType = {
  [index: string]: JSX.Element
}

const Icon: React.FC<IconProps> = ({name, ...props}) => {
  const iconMap: iconMapType = {
    faQuestion: (
      <FontAwesomeIcon {...(props as FaIconProps)} icon={faQuestion} />
    ),
    faTriangleExclamation: (
      <FontAwesomeIcon
        {...(props as FaIconProps)}
        icon={faTriangleExclamation}
      />
    ),
    faBolt: <FontAwesomeIcon {...(props as FaIconProps)} icon={faBolt} />,
    faFire: <FontAwesomeIcon {...(props as FaIconProps)} icon={faFire} />,
    faCheck: <FontAwesomeIcon {...(props as FaIconProps)} icon={faCheck} />,
    faCircleInfo: (
      <FontAwesomeIcon {...(props as FaIconProps)} icon={faCircleInfo} />
    ),
    faChevronDown: (
      <FontAwesomeIcon {...(props as FaIconProps)} icon={faChevronDown} />
    ),
    faChevronRight: <FontAwesomeIcon icon={faChevronRight} />,
    faFile: <FontAwesomeIcon {...(props as FaIconProps)} icon={faFile} />,
    faCopy: <FontAwesomeIcon {...(props as FaIconProps)} icon={faCopy} />,
    faKey: <FontAwesomeIcon {...(props as FaIconProps)} icon={faKey} />,
    faBook: <FontAwesomeIcon {...(props as FaIconProps)} icon={faBook} />,
    faCd: <FontAwesomeIcon {...(props as FaIconProps)} icon={faCompactDisc} />,
    siAnsible: <SiAnsible color="#EE0000" {...(props as IconBaseProps)} />,
    siJavascript: (
      <SiJavascript color="#F7DF1E" {...(props as IconBaseProps)} />
    ),
    siTypescript: (
      <SiTypescript color="#3178C6" {...(props as IconBaseProps)} />
    ),
    siPython: <SiPython color="#3776AB" {...(props as IconBaseProps)} />,
    siMarkdown: <SiMarkdown color="#000000" {...(props as IconBaseProps)} />,
    siSaltproject: (
      <SiSaltproject color="#57BCAD" {...(props as IconBaseProps)} />
    ),
    siGnubash: <SiGnubash color="#4EAA25" {...(props as IconBaseProps)} />,
    siGit: <SiGit color="#F05032" {...(props as IconBaseProps)} />,
    siApple: <SiApple color="#FFF" {...(props as IconBaseProps)} />,
    siYaml: <SiYaml color="#CB171E" {...(props as IconBaseProps)} />
  }

  return iconMap[name] || <FontAwesomeIcon icon={faBlockQuestion} fixedWidth />
}

export default Icon
