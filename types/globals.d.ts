declare interface CSSStyleSheet {
  replace(css: string): Promise<void>
  replaceSync(css: string): void
}

declare interface ShadowRoot {
  adoptedStyleSheets: readonly CSSStyleSheet[]
}
