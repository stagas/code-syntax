import $ from 'sigl'

import { escape } from 'html-escaper'
import { compile, RegExpMapped, syntax as syntaxHighlight, SyntaxDefinition, SyntaxOrImport } from './syntax'

export type { RegExpMapped, SyntaxDefinition, SyntaxOrImport }

export const languages: Record<string, SyntaxOrImport> = {}

const compiled = new Map<object, { style: CSSStyleSheet; regexp: RegExpMapped }>()

const style = /*css*/ `
:host {
  contain: layout style paint;
  display: block;
}
* {
  contain: layout style paint;
  text-rendering: optimizeSpeed;
  color: var(--color);
}
*::selection {
  background: var(--selection) !important;
}
pre,
code {
  margin: 0;
  text-rendering: optimizeSpeed;
  font-family: inherit;
}
slot {
  display: none;
}`

const keyStyle = (x: string) => /*css*/ `
.${x} {
  color: var(--${x});
  font-style: var(--${x}-style);
  font-weight: var(--${x}-weight);
}`

export interface CodeSyntaxElement extends $.Element<CodeSyntaxElement> {}

@$.element()
export class CodeSyntaxElement extends HTMLElement {
  root = $.shadow(this, /*html*/ `<style>${style}</style><slot></slot><pre><code></code></pre>`)

  @$.attr() language = $.String
  @$.attr() theme = $.String

  syntax?: SyntaxOrImport
  codeRef?: HTMLElement
  codeHTML?: string
  codeRawText?: string
  highlight?: (s: string) => string
  onTextContent?: (textContent: string) => void

  mounted($: this['$']) {
    $.codeRef = $.query('code')

    // prevents unstyled content from showing until attributes
    // have arrived and the actual syntax has compiled
    setTimeout(() => {
      if ($.highlight == null) $.highlight = escape
    }, 100)

    $.effect(({ language }) => {
      if (language in languages) $.syntax = languages[language]
    })

    $.effect(({ root }) =>
      $.onTextChange(root, text => {
        $.codeRawText = text
      })
    )

    $.effect(async ({ root, syntax }) => {
      let { style, regexp } = compiled.get(syntax) ?? {}
      if (!regexp || !style) {
        regexp = await compile(syntax)
        style = new CSSStyleSheet()
        await style.replace([...regexp.keys].map(keyStyle).join(''))
        compiled.set(syntax, { style, regexp })
      }
      root.adoptedStyleSheets = [style]
      $.highlight = (s: string) => syntaxHighlight(regexp!, s)
    })

    $.codeHTML = $.reduce(({ codeRawText, highlight }) => highlight(codeRawText))

    $.effect(({ codeRef, codeHTML }) => {
      codeRef.innerHTML = codeHTML
    })
  }
}
