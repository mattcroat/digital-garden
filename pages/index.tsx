import Link from 'next/link'

import { Layout } from '../components/Layout'

export default function Home() {
  return (
    <Layout>
      <h1>Digital Garden</h1>
      <ol>
        <li>
          <Link href="/post-1">Post 1</Link>
        </li>
        <li>
          <Link href="/post-2">Post 2</Link>
        </li>
      </ol>
    </Layout>
  )
}
