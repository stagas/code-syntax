import { escape } from 'html-escaper'
import { RegExpMapped, SyntaxDefinition, compile, syntax } from './syntax'

export type { SyntaxDefinition, RegExpMapped }

declare global {
  interface CSSStyleSheet {
    replaceSync(css: string): void
  }
  interface ShadowRoot {
    adoptedStyleSheets: readonly CSSStyleSheet[]
  }
}

const compiled: Map<object, { style: CSSStyleSheet; regexp: RegExpMapped }> = new Map()

export interface HTMLCodeSyntaxElement {
  language?: string
  theme?: string
  syntax?: SyntaxDefinition | Promise<{ default: SyntaxDefinition }>
  html?: string
  styleSheet?: CSSStyleSheet
}

export const createStyleSheet = (keys: string[]) => {
  const style = new CSSStyleSheet()
  style.replaceSync(
    `*{color:var(--color);}*::selection{background:var(--selection)!important}` +
      keys.map(x => `.${x}{color:var(--${x});font-style:var(--${x}-style);font-weight:var(--${x}-weight)}`).join('')
  )
  return style
}

export const languages: Record<string, SyntaxDefinition | Promise<{ default: SyntaxDefinition }>> = {}

/**
 * CodeSyntax custom element
 *
 * ```js
 * import { CodeSyntaxElement } from 'code-syntax'
 * customElements.define('code-syntax', CodeSyntaxElement)
 * ```
 */
export class CodeSyntaxElement extends HTMLElement {
  static get observedAttributes() {
    return ['language', 'theme', 'html']
  }

  #nodes: Node[] = []

  pins = {} as {
    code: HTMLElement
  }

  constructor() {
    super()

    const root = this.attachShadow({ mode: 'open' })
    root.innerHTML = /*html*/ `<slot style="display:none"></slot><pre style="margin:0"><code></code></pre>`

    this.pins.code = root.querySelector('code')!

    const contentObserver = new MutationObserver(this.render)
    const slot = root.querySelector('slot')!
    slot.addEventListener('slotchange', () => {
      this.#nodes = slot!.assignedNodes()
      this.#nodes.forEach(node => contentObserver.observe(node, { characterData: true }))
      this.render()
    })
  }

  highlight = (s: string) => escape(s)

  render = () => {
    this.html = this.highlight(
      this.#nodes
        .map(node => {
          const text = node.textContent!
          return text.trim().length ? text : ''
        })
        .join('')
    )
  }

  set html(html: string) {
    this.pins.code!.innerHTML = html
  }

  set syntax(def: SyntaxDefinition | Promise<{ default: SyntaxDefinition }>) {
    this.setSyntaxDefinition(def)
  }

  set styleSheet(styleSheet: CSSStyleSheet) {
    this.shadowRoot!.adoptedStyleSheets = [styleSheet]
  }

  async setSyntaxDefinition(def: SyntaxDefinition | Promise<{ default: SyntaxDefinition }>) {
    let { style, regexp } = compiled.get(def) ?? {}

    if (!style) {
      regexp = await compile(def)
      style = createStyleSheet([...(regexp.keys as Set<string>)])
      compiled.set(def, { style, regexp })
    }

    this.styleSheet = style
    this.highlight = (s: string) => syntax(regexp!, s)
    this.render()
  }

  attributeChangedCallback(name: string, _: string | null, newValue: string | null) {
    if (name === 'language' && newValue && newValue in languages) this.setSyntaxDefinition(languages[newValue])
    if (name === 'theme') this.setAttribute('code-syntax-theme', newValue!)
    if (name === 'html') this.html = newValue ?? ''
  }
}
