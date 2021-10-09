import Head from 'next/head'

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
            max-width: 60ch;
            margin: 0 auto;
          }
        `}
      </style>

      <style jsx global>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          html,
          body {
            height: 100%;
          }

          body {
            font-family: 'Inter', sans-serif;
            color: hsl(0 0% 100%);
            background-color: hsl(220 20% 14%);
          }

          h1 {
            padding: 2rem 0;
            font-size: 2rem;
            font-weight: 300;
          }

          p {
            font-size: 1.125rem;
            line-height: 1.4;
          }

          a {
            color: tomato;
          }

          ol,
          ul {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            list-style-position: inside;
          }
        `}
      </style>
    </>
  )
}
