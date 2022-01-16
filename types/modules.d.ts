declare module 'html-escaper' {
  export const escape: (s: string) => string
}

declare module 'make-cert'

declare module 'scoped-registries'

declare module '../languages/*' {
  import { SyntaxDefinition } from '.'
  export default {} as SyntaxDefinition
}
