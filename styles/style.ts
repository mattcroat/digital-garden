import css from 'styled-jsx/css'

const styles = css.global`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Mono:wght@400;700&family=Poppins:wght@400;700;900&display=swap');

  /*
    CSS Reset
  */

  *,
  *:after,
  *:before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /*
    CSS Variables
  */

  :root {
    --font-serif: 'Poppins', sans-serif;
    --font-mono: 'Noto Sans Mono', monospace;
    --font-primary: 3rem;
    --font-secondary: 1.5rem;
    --font-tertiary: 1.25rem;
    --font-text: 1.125rem;
    --line-height-text: 1.8;
    --reading-length: 60ch;
    --spacing-1: 1rem;
    --spacing-2: 2rem;
    --radius-base: 10px;
    --shadow: 2px 2px 4px hsl(0, 0%, 0%, 20%);
    --transition-color: color 0.3s, background-color 0.3s;
  }

  /*
    General
  */

  ::selection {
    background-color: var(--color-selection);
  }

  ::-webkit-scrollbar {
    width: 2px;
    height: 2px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--color-scrollbar);
  }

  html,
  body {
    height: 100%;
    /* firefox */
    scrollbar-color: var(--color-scrollbar);
    scrollbar-width: thin;
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

  h2 {
    margin: var(--spacing-1) 0;
    font-size: var(--font-secondary);
  }

  a {
    color: var(--color-link);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  table {
    border-collapse: collapse;
  }

  table,
  th,
  td {
    border: 1px solid var(--color-table-border);
  }

  th,
  td {
    padding: var(--spacing-1);
  }

  /*
    Themes
  */

  body[data-theme='dark'] {
    /* site colors */
    --color-text: hsl(0, 0%, 98%);
    --color-background: hsl(184, 10%, 10%);
    --color-background-gradient: hsl(184, 100%, 4%);
    --color-toggle: hsl(172, 100%, 28%);
    --color-toggle-sun: hsl(0, 0%, 98%);
    --color-toggle-moon: hsl(0, 0%, 98%);
    --color-toggle-mask: var(--color-toggle);
    --color-link: hsl(172, 100%, 50%);
    --color-post: hsl(184, 40%, 10%);
    --color-post-title: hsl(172, 100%, 50%);
    --color-post-description: hsl(184, 40%, 90%);
    --color-table-border: hsl(172, 100%, 28%);
    --color-blockquote: hsl(172, 100%, 28%);
    --color-selection: hsl(172, 100%, 28%);
    --color-scrollbar: hsl(172, 100%, 50%);

    /* code block */
    --color-code-block: hsl(172, 10%, 10%);
    --color-code-border: hsl(172, 10%, 12%);
    --color-code-title: hsl(172, 10%, 80%);
    --color-code-inline: hsl(172, 100%, 28%);
    --color-text-inline: hsl(0, 0%, 98%);

    /* line numbers */
    --color-code-line-highlight: hsl(172, 10%, 20%);
    --color-code-line-number: hsl(172, 10%, 80%);

    /* syntax highlight */
    --color-token-1: hsl(0, 0%, 98%);
    --color-token-2: hsl(172, 100%, 80%);
    --color-token-3: hsl(172, 100%, 40%);
    --color-token-4: hsl(172, 100%, 80%);
    --color-token-5: hsl(344, 47%, 68%);
    --color-token-6: hsl(172, 100%, 90%);
  }

  body[data-theme='light'] {
    /* site colors */
    --color-text: hsl(0, 0%, 20%);
    --color-background: hsl(0, 0%, 98%);
    --color-background-gradient: hsl(0, 0%, 98%);
    --color-toggle: hsl(172, 100%, 40%);
    --color-toggle-sun: hsl(0, 0%, 98%);
    --color-toggle-moon: hsl(220, 20%, 10%);
    --color-toggle-mask: var(--color-toggle);
    --color-link: hsl(172, 100%, 24%);
    --color-post: hsl(184, 40%, 90%);
    --color-post-title: hsl(184, 100%, 24%);
    --color-post-description: hsl(184, 40%, 20%);
    --color-table-border: hsl(172, 100%, 28%);
    --color-blockquote: hsl(172, 100%, 28%);
    --color-selection: hsl(172, 100%, 50%);
    --color-scrollbar: hsl(172, 100%, 40%);

    /* code block */
    --color-code-block: hsl(172, 10%, 10%);
    --color-code-border: hsl(172, 10%, 12%);
    --color-code-title: hsl(172, 10%, 80%);
    --color-code-inline: hsl(172, 100%, 28%);
    --color-text-inline: hsl(0, 0%, 98%);
    --color-blockquote: hsl(172, 100%, 28%);

    /* line numbers */
    --color-code-line-highlight: hsl(172, 10%, 20%);
    --color-code-line-number: hsl(172, 10%, 80%);

    /* syntax highlight */
    --color-token-1: hsl(0, 0%, 98%);
    --color-token-2: hsl(172, 100%, 80%);
    --color-token-3: hsl(172, 100%, 40%);
    --color-token-4: hsl(172, 100%, 80%);
    --color-token-5: hsl(344, 47%, 68%);
    --color-token-6: hsl(172, 100%, 90%);
  }

  /*
    Prose
  */

  .post {
    display: grid;
    grid-template-columns: 2rem minmax(0, var(--reading-length)) 2rem;
    justify-content: center;
    row-gap: var(--spacing-2);
  }

  .post > * {
    grid-column: 2/3;
  }

  /* span image and code blocks outside regular layout */
  @media (min-width: 640px) {
    .post {
      grid-template-columns: 4rem minmax(0, var(--reading-length)) 4rem;
    }

    .post .container {
      grid-column: 1/-1;
    }

    .post .rehype-code-title {
      grid-column: 1/-1;
    }

    .post .code-block {
      grid-column: 1/-1;
    }
  }

  .post .rehype-code-title {
    display: flex;
    align-items: center;
    margin-bottom: -2rem;
    padding: 0.6rem 1rem;
    color: var(--color-code-title);
    background-color: var(--color-code-block);
    border-bottom: 1px solid var(--color-code-border);
    border-radius: 4px 4px 0 0;
  }

  .post h1 {
    margin: var(--spacing-2) 0;
    font-size: var(--font-primary);
  }

  .post h2 {
    margin-top: var(--spacing-1);
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
    list-style-type: disc;
  }

  .post ul.contains-task-list {
    margin-bottom: var(--spacing-2);
    list-style-type: none;
  }

  .post img {
    max-width: 100%;
    height: 100%;
    display: block;
    border-radius: var(--radius-base);
  }

  .post blockquote {
    padding: var(--spacing-1);
    border-left: 2px solid var(--color-blockquote);
  }

  /*
    Utility
  */

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
`

export default styles
