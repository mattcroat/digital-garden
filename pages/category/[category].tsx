import { bundleMDXFile } from 'mdx-bundler'
import { cwd } from 'process'
import { readdirSync } from 'fs'

import { Post } from '@/root/types/post'
import Container from '@/root/components/layout/Container'
import Posts from '@/root/components/Posts'

interface CategoryProps {
  posts: Post[]
  category: typeof categories[number]
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

export default function Category({ posts, category }: CategoryProps) {
  return (
    <Container>
      <h2>{categoryName[category]}</h2>
      <Posts posts={posts} />
    </Container>
  )
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
