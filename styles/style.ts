import css from 'styled-jsx/css'

const styles = css.global`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&display=swap');

  *,
  *:after,
  *:before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --font-serif: 'Poppins', sans-serif;
    --font-primary: 3rem;
    --font-secondary: 1.5rem;
    --font-tertiary: 1.25rem;
    --font-text: 1.125rem;
    --line-height-text: 1.8;
    --reading-length: 60ch;
    --spacing-1: 1rem;
    --spacing-2: 2rem;
    --shadow: 2px 2px 4px hsl(0, 0%, 0%, 20%);
    --transition-color: color 0.3s, background-color 0.3s;
  }

  html,
  body {
    height: 100%;
  }

  body {
    font-family: var(--font-serif);
    color: var(--color-text);
    background-color: var(--color-background);
    background-image: linear-gradient(
      to bottom,
      var(--color-background-gradient),
      transparent
    );
    background-attachment: fixed;
    transition: var(--transition-color);
  }

  body[data-theme='dark'] {
    --color-text: hsl(0, 0%, 98%);
    --color-background: hsl(184, 10%, 10%);
    --color-background-gradient: hsl(184, 100%, 4%);
    --color-toggle: hsl(172, 100%, 28%);
    --color-toggle-sun: hsl(0, 0%, 98%);
    --color-toggle-moon: hsl(0, 0%, 98%);
    --color-toggle-mask: var(--color-toggle);
    --color-link: hsl(172, 100%, 50%);
  }

  body[data-theme='light'] {
    --color-text: hsl(0, 0%, 20%);
    --color-background: hsl(0, 0%, 98%);
    --color-background-gradient: hsl(0, 0%, 98%);
    --color-toggle: hsl(172, 100%, 40%);
    --color-toggle-sun: hsl(0, 0%, 98%);
    --color-toggle-moon: hsl(220, 20%, 10%);
    --color-toggle-mask: var(--color-toggle);
    --color-link: hsl(172, 100%, 24%);
  }

  .post h1 {
    font-size: var(--font-primary);
  }

  .post h2 {
    font-size: var(--font-secondary);
  }

  .post h3 {
    font-size: var(--font-tertiary);
  }

  .post p {
    font-size: var(--font-text);
    line-height: var(--line-height-text);
  }

  .post ol,
  .post ul {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-1);
    list-style-position: inside;
  }

  .post ul ul {
    padding: var(--spacing-1) 0 0 var(--spacing-1);
  }

  .post img {
    max-width: 100%;
    height: 100%;
    display: block;
    border-radius: 10px;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  a {
    color: var(--color-link);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`

export default styles
