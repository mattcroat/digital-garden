import { useMemo } from 'react'
import { bundleMDXFile } from 'mdx-bundler'
import { getMDXComponent } from 'mdx-bundler/client'
import { BundleMDXOptions } from 'mdx-bundler/dist/types'
import fs from 'fs'

// mdx plugins
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeImagePlaceholder from 'rehype-image-placeholder'
import rehypePrism from 'rehype-prism-plus'
import remarkGfm from 'remark-gfm'
import remarkHeadings from 'remark-autolink-headings'
import remarkSlug from 'remark-slug'
import remarkSmartypants from '@silvenon/remark-smartypants'
import remarkTableofContents from 'remark-toc'
import remarkUnwrapImages from 'remark-unwrap-images'

import { Post as Metadata } from '@/root/types/post'
import Blog from '@/root/components/layout/Blog'
import mdxComponents from '@/root/components/mdx'

interface PostProps {
  code: string
  metadata: Metadata
}

interface Params {
  params: {
    slug: string
  }
}

export default function Post({ code, metadata }: PostProps) {
  // avoid recreating the component every render
  const Component = useMemo(() => getMDXComponent(code), [code])

  return (
    <Blog metadata={metadata}>
      <Component components={mdxComponents as any} />
    </Blog>
  )
}

export async function getStaticPaths() {
  // post paths
  const currentDirectory = process.cwd()
  const posts = fs.readdirSync(`${currentDirectory}/posts`)
  const postPaths = posts.map((post) => post)

  // paths
  const paths = postPaths.map((path) => ({
    params: { slug: path },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: Params) {
  // slug
  const { slug } = params

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
        // `tight` removes <p> from <li> when nested
        [remarkTableofContents, { tight: true }],
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
        [rehypeImagePlaceholder, { dir: 'public' }],
      ]
      return options
    },
  }

  // post path
  const currentDirectory = process.cwd()
  const postPath = `${currentDirectory}/posts/${slug}/${slug}.mdx`
  const markdown = await bundleMDXFile(postPath, options)
  const { code, frontmatter: metadata } = markdown

  return {
    props: {
      code,
      metadata,
    },
  }
}
