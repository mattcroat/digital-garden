import { useMemo } from 'react'
import { bundleMDXFile } from 'mdx-bundler'
import { getMDXComponent } from 'mdx-bundler/client'
import { readdirSync } from 'fs'
import { cwd } from 'process'

import type { BundleMDXOptions } from 'mdx-bundler/dist/types'

interface PostProps {
  code: string
  frontmatter: Frontmatter
}

interface Frontmatter {
  title: string
  description: string
}

type Context = { params: { slug: string } }

export default function Post({ code, frontmatter }: PostProps) {
  const Component = useMemo(() => getMDXComponent(code), [code])
  return <Component />
}

export async function getStaticProps(context: Context) {
  // slug
  const { slug } = context.params

  // markdown plugins
  const options: BundleMDXOptions = {
    xdmOptions(options) {
      options.remarkPlugins = [...(options.remarkPlugins ?? [])]
      options.rehypePlugins = [...(options.rehypePlugins ?? [])]
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
