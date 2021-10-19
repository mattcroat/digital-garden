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
    <div>
      <Seo {...metadata} />
      <Navigation />
      <main className="post">{children}</main>

      <style jsx global>
        {styles}
      </style>

      <style jsx global>
        {prism}
      </style>
    </div>
  )
}
