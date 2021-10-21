import { Navigation } from '@/root/components/Navigation'
import Seo from '@/root/components/Seo'
import styles from '@/root/styles/style'
import prism from '@/root/styles/prism'

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
