import visit from 'unist-util-visit'
import sizeOf from 'image-size'
import lqip from 'lqip-modern'
import { cwd } from 'process'

export default function setImageSize(options) {
  async function transform(tree) {
    const promises: any[] = []

    function visitor(node, index, parent) {
      if (node.tagName === 'img') {
        const src = node.properties.src
        const currentDirectory = cwd()
        const image = `${currentDirectory}/public${src}`
        const { width, height } = sizeOf(image)

        node.properties.width = width
        node.properties.height = height

        const promise = lqip(image).then(({ metadata }) => {
          const base64Image = metadata.dataURIBase64
          node.properties.blurDataURL = base64Image
        })

        promises.push(promise)
      }
    }

    visit(tree, 'element', visitor)
    await Promise.all(promises)
  }

  return transform
}
