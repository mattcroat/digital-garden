import { bundleMDXFile } from 'mdx-bundler'
import Link from 'next/link'
import fs from 'fs'

import { Post } from '../types/post'
import Layout from '../components/Layout'

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
  // post paths
  const currentDirectory = process.cwd()
  const posts = fs.readdirSync(`${currentDirectory}/posts`)

  // metadata from frontmatter
  const postsMetadata = []

  for (let post of posts) {
    const postPath = `${currentDirectory}/posts/${post}/${post}.mdx`
    const markdown = await bundleMDXFile(postPath)
    const { frontmatter } = markdown

    const timestamp = new Date(frontmatter.published).valueOf()
    frontmatter.published = timestamp

    postsMetadata.push(frontmatter)
  }

  // sort posts by oldest to newest
  const sortedPosts = postsMetadata.sort(
    (firstEl, secondEl) => secondEl.published - firstEl.published
  )

  return {
    props: {
      posts: sortedPosts,
    },
  }
}
