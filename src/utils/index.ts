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
  href: string | string[] | undefined
): KBIndex | null => {
  if (Array.isArray(href)) {
    href = href.join('/')
  }
  console.log(href)
  for (const node of tree) {
    console.log(node)
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
