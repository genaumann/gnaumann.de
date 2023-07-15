import {IconBaseProps} from 'react-icons'
import {
  SiAnsible,
  SiCredly,
  SiDebian,
  SiDocker,
  SiGit,
  SiGitlab,
  SiGnubash,
  SiIcinga,
  SiJavascript,
  SiKubernetes,
  SiMongodb,
  SiPerl,
  SiPython,
  SiReact,
  SiRedhat,
  SiSaltproject,
  SiTerraform,
  SiVault,
  SiWindows
} from 'react-icons/si'

interface SimpleIconProps extends IconBaseProps {
  name: string
}

type iconMappingType = {
  [index: string]: JSX.Element
}

const SimpleIcon: React.FunctionComponent<SimpleIconProps> = ({
  name,
  ...props
}) => {
  const iconMapping: iconMappingType = {
    ansible: <SiAnsible title="Ansible" color="#EE0000" {...props} />,
    salt: <SiSaltproject title="Salt" color="#57BCAD" {...props} />,
    icinga: <SiIcinga title="Icinga" color="#06062C" {...props} />,
    react: <SiReact title="React" color="#61DAFB" {...props} />,
    debian: <SiDebian title="Debian" color="#A81D33" {...props} />,
    terraform: <SiTerraform title="Terraform" color="#7B42BC" {...props} />,
    vault: <SiVault title="Vault" color="#000000" {...props} />,
    bash: <SiGnubash title="GNU Bash" color="#4EAA25" {...props} />,
    windows: <SiWindows title="Windows" color="#0078D6" {...props} />,
    git: <SiGit title="Git" color="#F05032" {...props} />,
    gitlab: <SiGitlab title="GitLab" color="#FC6D26" {...props} />,
    docker: <SiDocker title="Docker" color="#2496ED" {...props} />,
    kubernetes: <SiKubernetes title="Kubernetes" color="#326CE5" {...props} />,
    perl: <SiPerl title="Perl" color="#39457E" {...props} />,
    javascript: <SiJavascript title="Javascript" color="#F7DF1E" {...props} />,
    python: <SiPython title="Python" color="#3776AB" {...props} />,
    mongodb: <SiMongodb title="MongoDB" color="#47A248" {...props} />,
    redhat: <SiRedhat title="Red Hat" color="#EE0000" {...props} />,
    credly: <SiCredly title="Credly" color="#FF6B00" {...props} />
  }
  return <>{iconMapping[name]}</>
}

export default SimpleIcon
