import { Navigation } from './Navigation'
import Seo from './Seo'
import styles from '../styles/style'
import prism from '../styles/prism'

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
            max-width: var(--reading-length);
            margin: 0 auto;
          }

          .post {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: var(--spacing-2);
          }
        `}
      </style>

      <style jsx global>
        {styles}
      </style>

      <style jsx global>
        {prism}
      </style>
    </div>
  )
}
