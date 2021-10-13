import Head from 'next/head'

export default function Seo({ ...metadata }) {
  const url = 'your-site-url'
  const meta = {
    title: 'Digital Garden',
    description: `Description of the site`,
    image: `${url}/images/og-image.webp`,
    ...metadata,
  }

  return (
    <Head>
      <title>{meta.title}</title>

      <meta content="index, follow" name="robots" />
      <meta content={meta.description} name="description" />

      <meta content={meta.title} property="og:title" />
      <meta content={meta.image} property="og:image" />
      <meta content={meta.description} property="og:description" />

      <meta content="summary_large_image" name="twitter:card" />
      <meta content={meta.title} name="twitter:title" />
      <meta content={meta.description} name="twitter:description" />
      <meta content={meta.image} name="twitter:image" />

      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}
