import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

const links = [
  { location: '🌱 Digital Garden', url: '/' },
  { location: 'HTML', url: '/category/html' },
  { location: 'CSS', url: '/category/css' },
  { location: 'JavaScript', url: '/category/javascript' },
]

function Links() {
  return (
    <ol>
      {links.map(({ location, url }) => (
        <li key={location}>
          <Link href={url}>{location}</Link>
        </li>
      ))}

      <style jsx>
        {`
          ol {
            display: flex;
            gap: var(--spacing-1);
            list-style: none;
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
            justify-content: space-between;
            align-items: center;
            padding: var(--spacing-2) 0;
          }

          ol {
            display: flex;
            gap: var(--spacing-1);
            list-style: none;
          }
        `}
      </style>
    </nav>
  )
}
