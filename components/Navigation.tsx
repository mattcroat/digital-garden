import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

const links = [
  { location: 'Home', url: '/' },
  { location: 'Posts', url: '/category/posts' },
  { location: 'About', url: '/about' },
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
            gap: 1rem;
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
            width: 100%;
          }

          ol {
            display: flex;
            gap: 1rem;
            list-style: none;
          }
        `}
      </style>
    </nav>
  )
}
