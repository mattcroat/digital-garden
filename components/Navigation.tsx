import Link from 'next/link'
import dynamic from 'next/dynamic'

// we don't want to run the code on the server
const ThemeToggle = dynamic(() => import('./ThemeToggle'), { ssr: false })

const links = [
  { location: '🌱 Digital Garden', url: '/' },
  { location: '🏷️ HTML', url: '/category/html' },
  { location: '😎 CSS', url: '/category/css' },
  { location: '📜 JavaScript', url: '/category/javascript' },
]

function Links() {
  return (
    <ol>
      {links.map(({ location, url }) => (
        <li key={location}>
          <Link href={url}>
            <a>{location}</a>
          </Link>
        </li>
      ))}

      <style jsx>
        {`
          ol {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-1);
            list-style: none;
          }

          @media (min-width: 640px) {
            ol {
              display: flex;
              flex-direction: row;
              gap: var(--spacing-1);
            }
          }
        `}
      </style>
    </ol>
  )
}

export function Navigation() {
  return (
    <nav>
      <Links />
      <ThemeToggle />

      <style jsx>
        {`
          nav {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-1);
            padding: var(--spacing-2);
          }

          @media (min-width: 640px) {
            nav {
              max-width: var(--reading-length);
              margin: 0 auto;
              padding: var(--spacing-2) 0;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
            }
          }
        `}
      </style>
    </nav>
  )
}
