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
    <section>
      {posts.map(({ title, description, slug }) => (
        <article key={slug}>
          <Link href={`/${slug}`}>
            <a>{title}</a>
          </Link>
          <p>{description}</p>
        </article>
      ))}

      <style jsx>
        {`
          section {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-1);
          }

          article {
            padding: var(--spacing-1);
            background-color: var(--color-post);
            border-radius: var(--radius-base);
          }

          a {
            font-size: var(--font-tertiary);
            color: var(--color-post-title);
          }

          p {
            color: var(--color-post-description);
          }
        `}
      </style>
    </section>
  )
}

export default function Home({ posts }: HomeProps) {
  return (
    <Layout>
      <h1>Latest Posts</h1>
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
