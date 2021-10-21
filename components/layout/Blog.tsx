import { Navigation } from '../Navigation'
import Seo from '../Seo'
import styles from '../../styles/style'
import prism from '../../styles/prism'

interface BlogProps {
  children: React.ReactNode
  metadata?: any
}

export default function Blog({ children, metadata }: BlogProps) {
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
