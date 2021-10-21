import { Navigation } from '@/root/components/Navigation'
import Seo from '@/root/components/Seo'
import styles from '@/root/styles/style'
import prism from '@/root/styles/prism'
import { Post } from '@/root/types/post'

interface ContainerProps {
  children: React.ReactNode
  metadata?: Post
}

export default function Container({ children, metadata }: ContainerProps) {
  return (
    <div>
      <Seo {...metadata} />
      <Navigation />
      <main>{children}</main>

      <style jsx>
        {`
          main {
            padding: 0 var(--spacing-2);
          }

          @media (min-width: 640px) {
            main {
              width: var(--reading-length);
              margin: 0 auto;
              padding: var(--spacing-2) 0;
            }
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
