import Link from 'next/link'
import { bundleMDXFile } from 'mdx-bundler'
import { cwd } from 'process'
import { readdirSync } from 'fs'

import Blog from '../../components/layout/Blog'

interface Post {
  category: string
  description: string
  image: string
  published: number
  slug: string
  title: string
}

interface CategoryProps {
  posts: Post[]
  category: typeof categories[number]
}

interface PostsProps {
  posts: Post[]
}

interface Context {
  params: {
    category: string
  }
}

const categories = ['html', 'css', 'javascript'] as const

const categoryName = {
  html: 'HTML',
  css: 'CSS',
  javascript: 'JavaScript',
}

function Posts({ posts }: PostsProps) {
  return (
    <ol>
      {posts.map(({ title, slug }) => (
        <li key={slug}>
          <Link href={`/${slug}`}>{title}</Link>
        </li>
      ))}
    </ol>
  )
}

export default function Category({ posts, category }: CategoryProps) {
  return (
    <Blog>
      <h1>{categoryName[category]}</h1>
      <Posts posts={posts} />
    </Blog>
  )
}

export async function getStaticProps(context: Context) {
  const { category } = context.params

  // get the post paths
  const currentDirectory = cwd()
  const postFoldersPath = `${currentDirectory}/posts`
  const postFolders = readdirSync(postFoldersPath)
  const postPaths = postFolders.map(
    (folder) => `${currentDirectory}/posts/${folder}/${folder}.mdx`
  )

  // get the posts
  const posts = []

  for (let path of postPaths) {
    const markdown = await bundleMDXFile(path)
    const { frontmatter } = markdown

    if (frontmatter.category === category) {
      posts.push(frontmatter)
    }
  }

  // sort posts by oldest to newest
  const sortedPosts = posts.sort(
    (firstEl, secondEl) => secondEl.published - firstEl.published
  )

  return {
    props: {
      posts: sortedPosts,
      category,
    },
  }
}

export async function getStaticPaths() {
  // paths
  const paths = categories.map((category) => ({
    params: { category },
  }))

  return {
    paths,
    fallback: false,
  }
}
