import { escape } from 'html-escaper'
import { attrs, mixter, onTextChange, props, shadow, state } from 'mixter'
import { compile, RegExpMapped, syntax as syntaxHighlight, SyntaxDefinition, SyntaxOrImport } from './syntax'

export type { RegExpMapped, SyntaxDefinition, SyntaxOrImport }

export const languages: Record<string, SyntaxOrImport> = {}

const compiled: Map<object, { style: CSSStyleSheet; regexp: RegExpMapped }> = new Map()

const style = /*css*/ `
:host {
  display: block;
}
* {
  color: var(--color);
}
*::selection {
  background: var(--selection) !important;
}
pre {
  margin: 0;
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

export class CodeSyntaxElement extends mixter(
  HTMLElement,
  shadow(/*html*/ `<style>${style}</style><slot></slot><pre><code></code></pre>`),
  attrs(
    class {
      codeHTML = String
      language = String
      theme = String
    }
  ),
  props(
    class {
      syntax?: SyntaxOrImport
      code?: HTMLElement
      codeRawText?: string
      highlight?: (s: string) => string
      onTextContent?: (textContent: string) => void
    }
  ),
  state<CodeSyntaxElement>(({ $, effect, reduce }) => {
    $.code = reduce(({ root }) => root.querySelector('code')!)

    // prevents unstyled content from showing until attributes
    // have arrived and the actual syntax has compiled
    setTimeout(() => {
      if ($.highlight == null) $.highlight = escape
    }, 100)

    effect(({ language }) => {
      if (language in languages) $.syntax = languages[language]
    })

    effect(async ({ root, syntax }) => {
      let { style, regexp } = compiled.get(syntax) ?? {}
      if (!regexp || !style) {
        regexp = await compile(syntax)
        style = new CSSStyleSheet()
        await style.replace([...regexp.keys].map(keyStyle).join(''))
        compiled.set(syntax, { style, regexp })
      }
      ;(root as ShadowRoot).adoptedStyleSheets = [style]
      $.highlight = (s: string) => syntaxHighlight(regexp!, s)
    })

    effect(({ root }) =>
      onTextChange(root as ShadowRoot, text => {
        $.codeRawText = text
      })
    )

    $.codeHTML = reduce(({ codeRawText, highlight }) => highlight(codeRawText))

    effect(({ code, codeHTML }) => {
      code.innerHTML = codeHTML
    })
  })
) {}
