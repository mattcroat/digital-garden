import css from 'styled-jsx/css'

const prism = css.global`
  /*
    Syntax highlight
  */

  pre {
    padding: var(--spacing-1);
    border-radius: var(--radius-base);
    border-radius: 0 0 4px 4px;
    background-color: var(--color-code-block);
    box-shadow: 0px 4px 2px hsl(0, 0%, 0%, 10%);
    overflow-x: scroll;
  }

  code[class*='language-'],
  pre[class*='language-'] {
    color: var(--color-token-1);
    font-family: var(--font-mono);
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    line-height: 1.5;
    tab-size: 4;
    hyphens: none;
  }

  /* code blocks */
  pre[class*='language-'] {
    margin: 0.5em 0;
    padding: 1em;
    overflow: auto;
  }

  /* inline code */
  :not(pre) > code {
    padding: 0.4em;
    border-radius: 0.3em;
    color: var(--color-text-inline);
    background-color: var(--color-code-inline);
  }

  .token.comment,
  .token.prolog,
  .token.cdata {
    color: var(--color-token-2);
  }

  .token.delimiter,
  .token.boolean,
  .token.keyword,
  .token.selector,
  .token.important,
  .token.atrule {
    color: var(--color-token-3);
  }

  .token.operator,
  .token.punctuation,
  .token.attr-name {
    color: var(--color-token-2);
  }

  .token.tag,
  .token.tag .punctuation,
  .token.doctype,
  .token.builtin {
    color: var(--color-token-4);
  }

  .token.entity,
  .token.number,
  .token.symbol {
    color: var(--color-token-5);
  }

  .token.property,
  .token.constant,
  .token.variable {
    color: var(--color-token-3);
  }

  .token.string,
  .token.char {
    color: var(--color-token-6);
  }

  .token.attr-value,
  .token.attr-value .punctuation {
    color: var(--color-token-2);
  }

  .token.url {
    color: var(--color-token-6);
    text-decoration: underline;
  }

  .token.function {
    color: var(--color-token-4);
  }

  .token.regex {
    background-color: var(--color-token-6);
  }

  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }

  .token.inserted {
    background-color: var(--color-token-2);
  }

  .token.deleted {
    background-color: var(--color-token-3);
  }

  /*
    Line highlight
  */

  .code-highlight {
    width: 100%;
    float: left;
  }

  .code-line {
    display: block;
    padding-right: 16px;
    padding-left: 16px;
    margin-right: -16px;
    margin-left: -16px;
  }

  .highlight-line {
    margin-right: -16px;
    margin-left: -16px;
    background-color: var(--color-code-line-highlight);
  }

  .line-number::before {
    content: attr(line);
    margin-left: -8px;
    padding-right: 16px;
    color: var(--color-code-line-number);
  }
`

export default prism
