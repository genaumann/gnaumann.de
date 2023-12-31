import {Plugin} from 'unified'
import {Root, ElementContent, Element} from 'hast'
import {visit} from 'unist-util-visit'
import {Node} from 'unist'
import {common, createLowlight} from 'lowlight'
import {toString} from 'hast-util-to-string'
import {Nodes} from 'hast-util-to-string/lib'

type markMapType = {
  [index: string]: {marker: string; class: string}
}

const markLines = (input: string) => {
  const lines = input.split('\n')

  const markMap: markMapType = {
    add: {marker: '>>>>>>', class: 'bg-teal-900/50'},
    del: {marker: '<<<<<<', class: 'bg-red-900/50'}
  }

  const markedLines: ElementContent[] = lines.map(line => {
    let markType = undefined
    if (line.startsWith(markMap['add'].marker)) {
      markType = 'add'
    }
    if (line.startsWith(markMap['del'].marker)) {
      markType = 'del'
    }
    if (markType !== undefined) {
      const text = line.replace(markMap[markType].marker, '')
      return {
        type: 'element',
        tagName: 'span',
        properties: {
          className: [markMap[markType].class, 'hlLine']
        },
        children: [
          {
            type: 'text',
            value: `${text}\n`
          }
        ]
      }
    } else {
      return {
        type: 'text',
        value: `${line}\n`
      }
    }
  })
  return markedLines
}

const language = (node: Element) => {
  const className = node.properties && node.properties.className
  let index = -1

  if (!Array.isArray(className)) {
    return
  }

  while (++index < className.length) {
    const value = String(className[index])

    if (
      value === 'no-highlight' ||
      value === 'nohighlight' ||
      value === 'language-nohighlight'
    ) {
      return false
    }

    if (value.slice(0, 5) === 'lang-') {
      return value.slice(5)
    }

    if (value.slice(0, 9) === 'language-') {
      return value.slice(9)
    }
  }
}

const highlightLine: Plugin<void[], Root> = () => {
  return tree => {
    visit(tree, 'element', (node, _, givenParent) => {
      const parent = givenParent as Node
      const name = 'hljs'

      if (
        !parent ||
        !('tagName' in parent) ||
        parent.tagName !== 'pre' ||
        node.tagName !== 'code' ||
        node.children.length !== 1 ||
        !('value' in node.children[0]) ||
        !node.properties
      ) {
        return
      }

      const lang = language(node)

      if (lang === false) {
        return
      }

      if (!Array.isArray(node.properties.className)) {
        node.properties.className = []
      }

      if (!node.properties.className.includes(name)) {
        node.properties.className.unshift(name)
      }

      const markedLines = markLines(node.children[0].value)

      const allChildren = markedLines.map(element => {
        const lowlight = createLowlight(common)
        const res = lang
          ? lowlight.highlight(
              lang,
              toString(element as Nodes).replace('\n', '')
            )
          : lowlight.highlightAuto(toString(element as Nodes).replace('\n', ''))
        if ('children' in element && res.children.length > 0) {
          element.children = res.children as ElementContent[]
          return element
        }
        if (
          ('value' in element && element.value === '\n') ||
          element.type === 'element'
        ) {
          return element
        }
        if ('value' in element && element.value.endsWith('\n')) {
          res.children.push({type: 'text', value: '\n'})
        }
        return res.children
      })
      node.children = allChildren.flat() as Element[]
    })
  }
}

export default highlightLine
