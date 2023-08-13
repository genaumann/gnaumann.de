import {NodeId} from 'react-accessible-treeview/dist/TreeView/types'
import {KBIndex} from '@/types'

export const calcAge = (birthdate: Date): number => {
  const today = new Date()
  const birthYear = birthdate.getFullYear()
  const birthMonth = birthdate.getMonth()
  const birthDay = birthdate.getDate()

  let age = today.getFullYear() - birthYear
  const monthDifference = today.getMonth() - birthMonth

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDay)
  ) {
    age--
  }

  return age
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${day}.${month}.${year}`
}

interface ITreeNode {
  id?: NodeId
  name: string
  children?: ITreeNode[]
}

export const convertIndexTree = (originalTree: KBIndex): ITreeNode => {
  const {title, href, children} = originalTree
  const newChildren = children ? children.map(convertIndexTree) : undefined

  const data = {
    name: title,
    id: href,
    children: newChildren
  }

  return data
}

export const findArticleByHref = (
  tree: KBIndex[],
  href: string
): KBIndex | null => {
  for (const node of tree) {
    if (node.href === href) {
      return node
    }

    if (node.children) {
      const result = findArticleByHref(node.children, href)
      if (result) {
        return result
      }
    }
  }

  return null
}

export const calculateRelativeTime = (pastDateString: string): string => {
  const oneDay = 24 * 60 * 60 * 1000
  const oneWeek = oneDay * 7
  const oneMonth = oneDay * 30
  const oneYear = oneDay * 365

  const currentDate = new Date()
  const pastDate = new Date(pastDateString)

  const differenceInMillis = currentDate.getTime() - pastDate.getTime()

  if (differenceInMillis < oneWeek) {
    const days = Math.round(differenceInMillis / oneDay)
    return `${days} Tag${days > 1 ? 'en' : ''}`
  } else if (differenceInMillis < oneMonth) {
    const weeks = Math.round(differenceInMillis / oneWeek)
    return `${weeks} Woche${weeks > 1 ? 'n' : ''}`
  } else if (differenceInMillis < oneYear) {
    const months = Math.round(differenceInMillis / oneMonth)
    return `${months} Monat${months > 1 ? 'e' : ''}`
  } else {
    const years = Math.round(differenceInMillis / oneYear)
    return `${years} Jahr${years > 1 ? 'en' : ''}`
  }
}
