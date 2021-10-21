import Link from 'next/link'

import { Post } from '@/root/types/post'

interface PostsProps {
  posts: Post[]
}

export default function Posts({ posts }: PostsProps) {
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
