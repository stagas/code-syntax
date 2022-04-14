import { escape } from 'html-escaper'

export type RegExpMap = Record<string, RegExpMapped>
export type RegExpMapped = RegExp & { map: RegExpMap; keys: Set<string> }

export interface SyntaxDefinition {
  [k: string]: RegExp | [RegExp, SyntaxDefinition]
}

export type SyntaxOrImport = SyntaxDefinition | Promise<{ default: SyntaxDefinition }>

/**
 * Compiles a syntax definition.
 *
 * ```js
 * const r = await compile({
 *   foo: /[a-z]/,
 *   bar: /[0-9]/,
 * })
 * ```
 *
 * @param def The syntax definition to compile. Can be a promise returned by `import()`.
 */
export const compile = async (
  def: SyntaxOrImport,
  keys: Set<string> = new Set(),
): Promise<RegExpMapped> => {
  // try to extract the definitions if we're given either module or promise
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const R = (await ((await (def as any)?.default) ?? def))?.default ?? def
  if (!R) throw new ReferenceError('Could not find definition for language')
  const map: RegExpMap = {}
  const parts = []
  // eslint-disable-next-line prefer-const
  for (let [name, value] of Object.entries(R)) {
    keys.add(name)
    if (Array.isArray(value)) {
      map[name] = await compile(value[1], keys)
      value = value[0]
    }
    parts.push(`(?<${name}>${(value as unknown as RegExp)?.source ?? value})`)
  }
  const regexp = RegExp(parts.join('|'), 'gm') as RegExpMapped
  regexp.map = map
  regexp.keys = keys
  return regexp
}

/**
 * Syntax highlights a string as html with the given syntax.
 *
 * ```js
 * const regexp = await compile({
 *   foo: /[a-z]+/,
 *   bar: [
 *     /[0-9]+/,
 *     {
 *       bar: /[0-5]+/,
 *     },
 *   ],
 * })
 * const html = syntax(regexp, 'hello 123 789 world')
 * ```
 *
 * @param regexp The syntax definition returned by `compile()`
 * @param s The string to highlight.
 */
export const syntax = (regexp: RegExpMapped | RegExp, s: string): string =>
  s.replace(RegExp('(' + regexp.source + ')|(?<catchbad>[&<>"\'])', 'gm'), (...args: unknown[]) => {
    const groups = args.pop() as RegExpMatchArray
    const entries = Object.entries(groups).filter(e => e[1] != null)
    if (!entries.length) return ''
    const [tag, value] = entries[0]
    if (tag === 'catchbad') return escape(value)
    if ((regexp as RegExpMapped).map) {
      const sub = (regexp as RegExpMapped).map[tag]
      if (sub) return `<span class="${tag}-outer">${syntax(sub, value)}</span>`
    }
    return `<span class="${tag}">${escape(value)}</span>`
  })
