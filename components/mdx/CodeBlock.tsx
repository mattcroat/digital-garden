import { useRef } from 'react'

interface CodeBlockProps {
  children: React.ReactNode
}

export default function CodeBlock({ children }: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null)

  function copy() {
    const content = preRef.current?.textContent ?? ''
    navigator.clipboard.writeText(content)
  }

  return (
    <div className="code-block">
      <pre ref={preRef}>{children}</pre>
      <button onClick={copy} className="copy">
        <span className="sr-only">Copy</span>
        <span>📋</span>
      </button>

      <style jsx>
        {`
          .code-block {
            position: relative;
          }

          .copy {
            cursor: pointer;
            position: absolute;
            top: -34px;
            right: 20px;
            font-size: 1rem;
            background: none;
            border-radius: var(--border-base);
            border: none;
            transition: transform 0.1s ease;
          }

          .copy:active {
            transform: scale(0.9);
          }
        `}
      </style>
    </div>
  )
}
