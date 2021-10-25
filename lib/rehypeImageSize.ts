// @ts-nocheck

import visit from 'unist-util-visit'
import sizeOf from 'image-size'
import lqip from 'lqip-modern'
import path from 'path'

export default function setImageSize(options = {}) {
  const { dir } = options

  async function transform(tree) {
    const promises = []

    function visitor(node) {
      if (node.tagName === 'img') {
        try {
          let src = node.properties.src

          // ignore external images
          if (src.startsWith('http')) {
            return
          }

          // if you pass a directory such as `public` combine it
          // otherwise use the relative path for the image
          if (dir && src.startsWith('/')) {
            src = path.join(dir, src)
          }

          // get the width and height of the image
          const { width, height } = sizeOf(src)

          // set the width and height
          node.properties.width = width
          node.properties.height = height

          // image placeholder
          const promise = lqip(src).then(({ metadata }) => {
            const base64Image = metadata.dataURIBase64
            node.properties.blurDataURL = base64Image
          })

          promises.push(promise)
        } catch (error) {
          console.error(error)
        }
      }
    }

    visit(tree, 'element', visitor)

    // if we don't await the placeholder it's going to skip it
    await Promise.all(promises)
  }

  return transform
}
