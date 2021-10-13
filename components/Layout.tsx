import Seo from './Seo'
import styles from '../styles'

interface LayoutProps {
  children: React.ReactNode
  metadata?: any
}

export default function Layout({ children, metadata }: LayoutProps) {
  return (
    <>
      <Seo {...metadata} />

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
