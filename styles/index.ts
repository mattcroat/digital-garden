import css from 'styled-jsx/css'

const styles = css.global`
  *,
  *:after,
  *:before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --font-serif: 'Inter', sans-serif;
    --transition-color: color 0.3s, background-color 0.3s;
    --shadow: 2px 2px 4px hsl(0, 0%, 0%, 20%);
  }

  html,
  body {
    height: 100%;
  }

  body {
    font-family: var(--font-serif);
    color: var(--color-text);
    background-color: var(--color-background);
    transition: var(--transition-color);
  }

  body[data-theme='dark'] {
    --color-text: hsl(0, 0%, 98%);
    --color-background: hsl(220, 20%, 14%);
    --color-toggle: hsl(220, 20%, 10%);
    --color-toggle-sun: hsl(0, 0%, 98%);
    --color-toggle-moon: hsl(0, 0%, 98%);
    --color-toggle-mask: var(--color-toggle);
  }

  body[data-theme='light'] {
    --color-text: hsl(0, 0%, 20%);
    --color-background: hsl(0 0% 94%);
    --color-toggle: hsl(0, 0%, 98%);
    --color-toggle-sun: hsl(220, 20%, 10%);
    --color-toggle-moon: hsl(220, 20%, 10%);
    --color-toggle-mask: var(--color-toggle);
  }

  .post h1 {
    padding: 2rem 0;
    font-size: 2rem;
    font-weight: 300;
  }

  .post p {
    font-size: 1.125rem;
    line-height: 1.4;
  }

  .post ol,
  .post ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    list-style-position: inside;
  }

  .post img {
    width: 100%;
    height: 100%;
    display: block;
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
    color: tomato;
  }

  code[class*='language-'],
  pre[class*='language-'] {
    color: #f8f8f2;
    background: none;
    font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono',
      monospace;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  /* code blocks */
  pre[class*='language-'] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
    border-radius: 0.3em;
  }

  :not(pre) > code[class*='language-'],
  pre[class*='language-'] {
    background: #2e3440;
  }

  /* inline code */
  :not(pre) > code[class*='language-'] {
    padding: 0.1em;
    border-radius: 0.3em;
    white-space: normal;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #636f88;
  }

  .token.punctuation {
    color: #81a1c1;
  }

  .namespace {
    opacity: 0.7;
  }

  .token.property,
  .token.tag,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: #81a1c1;
  }

  .token.number {
    color: #b48ead;
  }

  .token.boolean {
    color: #81a1c1;
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: #a3be8c;
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string,
  .token.variable {
    color: #81a1c1;
  }

  .token.atrule,
  .token.attr-value,
  .token.function,
  .token.class-name {
    color: #88c0d0;
  }

  .token.keyword {
    color: #81a1c1;
  }

  .token.regex,
  .token.important {
    color: #ebcb8b;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }
`

export default styles
