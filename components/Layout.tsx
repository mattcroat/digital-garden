import { Navigation } from './Navigation'
import Seo from './Seo'
import styles from '../styles'

interface LayoutProps {
  children: React.ReactNode
  metadata?: any
}

export default function Layout({ children, metadata }: LayoutProps) {
  return (
    <div className="container">
      <Seo {...metadata} />
      <Navigation />
      <main className="post">{children}</main>

      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            max-width: 60ch;
            margin: 0 auto;
            padding: 2rem 0;
          }

          .post {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 2rem;
          }
        `}
      </style>

      <style jsx global>
        {styles}
      </style>
    </div>
  )
}
