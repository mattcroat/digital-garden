import { useEffect, useState } from 'react'

interface ToggleProps {
  checked: boolean
  toggle: () => void
}

// https://codepen.io/havardob/pen/MWawKVy

function Toggle({ checked, toggle }: ToggleProps) {
  return (
    <div className="toggle">
      <input onChange={toggle} type="checkbox" id="toggle" checked={checked} />
      <label htmlFor="toggle">
        <span className="sr-only">Dark Mode Toggle</span>
      </label>

      <style jsx>
        {`
          .toggle {
            --width: 80px;
            --height: 40px;
            --radius-circle: 20px;
            --translate-x-moon: 34px;
            --translate-x-mask: 96px;

            transition: var(--transition-color);
          }

          label {
            width: var(--width);
            height: var(--height);
            display: block;
            position: relative;
            background-color: var(--color-toggle);
            border-radius: 50px;
            box-shadow: var(--shadow);
            overflow: hidden;
            cursor: pointer;
          }

          label:before,
          label:after {
            content: '';
            width: var(--radius-circle);
            height: var(--radius-circle);
            position: absolute;
            top: 10px;
            left: 14px;
            border-radius: 50%;
            transition: transform 0.5s ease;
          }

          label:before {
            background-color: var(--color-toggle-sun);
          }

          label:after {
            background-color: var(--color-toggle-mask);
            left: -58px;
          }

          input[type='checkbox'] {
            display: none;
          }

          input[type='checkbox']:checked + label:before {
            background-color: var(--color-toggle-moon);
            transform: translateX(var(--translate-x-moon));
          }

          input[type='checkbox']:checked + label:after {
            transform: translateX(var(--translate-x-mask));
          }
        `}
      </style>
    </div>
  )
}

export default function DarkModeToggle() {
  const [theme, setTheme] = useState<string>('dark')
  const checked = theme === 'dark' ? true : false
  const flipTheme = theme === 'dark' ? 'light' : 'dark'

  useEffect(() => {
    // if theme is selected use it
    const selectedTheme = localStorage.getItem('theme')
    // otherwise see if the user has a set preference
    const prefers = matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark'
    selectedTheme ? setTheme(selectedTheme) : setTheme(prefers)
  }, [])

  useEffect(() => {
    document.body.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  function handleToggle() {
    setTheme(flipTheme)
  }

  return <Toggle checked={checked} toggle={handleToggle} />
}
