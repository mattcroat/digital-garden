import { useMemo } from 'react'
import { bundleMDXFile } from 'mdx-bundler'
import { getMDXComponent } from 'mdx-bundler/client'
import { readdirSync } from 'fs'
import { cwd } from 'process'
import type { BundleMDXOptions } from 'mdx-bundler/dist/types'

// mdx plugins
import rehypeCodeTitles from 'rehype-code-titles'
import rehypePrism from '@mapbox/rehype-prism'
import remarkGfm from 'remark-gfm'
import remarkHeadings from 'remark-autolink-headings'
import remarkSlug from 'remark-slug'
import remarkSmartypants from '@silvenon/remark-smartypants'
import remarkTableofContents from 'remark-toc'
import remarkUnwrapImages from 'remark-unwrap-images'

import Layout from '../components/Layout'
import mdxComponents from '../components/mdx'
import rehypeImageSize from '../lib/rehypeImageSize'

interface PostProps {
  code: string
  metadata: Metadata
}

interface Metadata {
  title: string
  description: string
  published: string
  category: string
  image: string
}

type Context = { params: { slug: string } }

export default function Post({ code, metadata }: PostProps) {
  // avoid recreating the component every render
  const Component = useMemo(() => getMDXComponent(code), [code])

  return (
    <Layout metadata={metadata}>
      <Component components={mdxComponents as any} />
    </Layout>
  )
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
        // add links to headings
        remarkSlug,
        // smart typographic punctuation like real quotes
        remarkSmartypants,
        // generates table of contents from headings
        remarkTableofContents,
        // remove paragraph around images
        remarkUnwrapImages,
      ]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        // title for code blocks (has to come before `rehypePrism`)
        rehypeCodeTitles,
        // syntax highlight
        rehypePrism,
        // image dimensions and placeholder
        [rehypeImageSize, { dir: 'public' }],
      ]
      return options
    },
  }

  // post path
  const currentDirectory = cwd()
  const path = `${currentDirectory}/posts/${slug}/${slug}.mdx`
  const markdown = await bundleMDXFile(path, options)
  const { code, frontmatter: metadata } = markdown

  return {
    props: {
      code,
      metadata,
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
