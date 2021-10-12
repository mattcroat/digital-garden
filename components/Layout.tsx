import Head from 'next/head'

import styles from '../styles'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Digital Garden</title>
        <meta name="description" content="Digital garden" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{children}</main>

      <style jsx>
        {`
          main {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 2rem;
            max-width: 60ch;
            margin: 0 auto;
          }
        `}
      </style>

      <style jsx global>
        {styles}
      </style>
    </>
  )
}
