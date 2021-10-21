import { bundleMDXFile } from 'mdx-bundler'
import fs from 'fs'

import { Post } from '@/root/types/post'
import Posts from '@/root/components/Posts'
import Container from '@/root/components/layout/Container'

interface HomeProps {
  posts: Post[]
}

export default function Home({ posts }: HomeProps) {
  return (
    <Container>
      <h2>Latest Posts</h2>
      <Posts posts={posts} />
    </Container>
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
