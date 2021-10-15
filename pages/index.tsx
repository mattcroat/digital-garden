import Link from 'next/link'
import { bundleMDXFile } from 'mdx-bundler'
import { cwd } from 'process'
import { readdirSync } from 'fs'

import Layout from '../components/Layout'

interface Post {
  category: string
  description: string
  image: string
  published: number
  slug: string
  title: string
}

interface PostsProps {
  posts: Post[]
}

interface HomeProps {
  posts: Post[]
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

export default function Home({ posts }: HomeProps) {
  return (
    <Layout>
      <h1>Digital Garden</h1>
      <Posts posts={posts} />
    </Layout>
  )
}

export async function getStaticProps() {
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

    const published = frontmatter.published
    const timestamp = new Date(published).valueOf()
    const slug = path.match(/([\w\d-]+).mdx/)![1]

    frontmatter.published = timestamp
    frontmatter.slug = slug

    posts.push(frontmatter)
  }

  // sort posts by oldest to newest
  const sortedPosts = posts.sort(
    (firstEl, secondEl) => secondEl.published - firstEl.published
  )

  return {
    props: {
      posts: sortedPosts,
    },
  }
}
