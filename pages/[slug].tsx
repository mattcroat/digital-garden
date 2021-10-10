// @ts-nocheck

import { useMemo } from 'react'
import Image from 'next/image'
import { bundleMDXFile } from 'mdx-bundler'
import { getMDXComponent } from 'mdx-bundler/client'
import { readdirSync } from 'fs'
import { cwd } from 'process'

// mdx plugins
import remarkCodeTitle from 'remark-code-titles'
import remarkGfm from 'remark-gfm'
import remarkHeadings from 'remark-autolink-headings'
import remarkPrism from 'remark-prism'
import remarkSlug from 'remark-slug'
import remarkSmartypants from '@silvenon/remark-smartypants'
import remarkTableofContents from 'remark-toc'
import remarkUnwrapImages from 'remark-unwrap-images'

import type { BundleMDXOptions } from 'mdx-bundler/dist/types'

// experimental
import visit from 'unist-util-visit'
import sizeOf from 'image-size'
import lqip from 'lqip-modern'

interface PostProps {
  code: string
  frontmatter: Frontmatter
}

interface Frontmatter {
  title: string
  description: string
}

type Context = { params: { slug: string } }

const mdxComponents = {
  img: ({ src, alt, width, height, blurDataURL }) => (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      placeholder="blur"
      blurDataURL={blurDataURL}
    />
  ),
}

function setImageSize(options) {
  console.log(options)

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

export default function Post({ code, frontmatter }: PostProps) {
  // avoid recreating the component every render
  const Component = useMemo(() => getMDXComponent(code), [code])
  // @ts-expect-error the types are wrong here
  return <Component components={mdxComponents} />
}

export async function getStaticProps(context: Context) {
  // slug
  const { slug } = context.params

  // markdown plugins
  const options: BundleMDXOptions = {
    xdmOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        // github flavored markdown
        remarkGfm,
        // add id to headings
        remarkHeadings,
        // syntax highlight
        remarkPrism,
        // add links to headings
        remarkSlug,
        // add code title for code block (order is important)
        remarkCodeTitle,
        // smart typographic punctuation like real quotes
        remarkSmartypants,
        // generates table of contents from headings
        remarkTableofContents,
        // remove paragraph around images
        remarkUnwrapImages,
      ]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        [setImageSize, { dir: 'public' }],
      ]
      return options
    },
  }

  // post path
  const currentDirectory = cwd()
  const path = `${currentDirectory}/posts/${slug}/${slug}.mdx`
  const markdown = await bundleMDXFile(path, options)
  const { code, frontmatter } = markdown

  return {
    props: {
      code,
      frontmatter,
    },
  }
}

export async function getStaticPaths() {
  // get the post paths
  const currentDirectory = cwd()
  const postFoldersPath = `${currentDirectory}/posts`
  const postFolders = readdirSync(postFoldersPath)
  const postPaths = postFolders.map(
    (folder) => `${currentDirectory}/posts/${folder}`
  )

  // get the posts
  const posts = []

  for (const path of postPaths) {
    const files = readdirSync(path)
    const filteredPosts = files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace('.mdx', ''))
    posts.push(...filteredPosts)
  }

  // paths
  const paths = posts.map((post) => ({
    params: { slug: post },
  }))

  return {
    paths,
    fallback: false,
  }
}
