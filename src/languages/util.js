const X = RegExp
export const join = (s, ...r) => X(`(${r.map(x => `(${x.source})`).join(s)})`)
export const split = (s) => X(`(${s
  .split(' ')
  .map(x => x.replace(/[\^$\\()[\]?*+\-.|]/g, '\\$&').trim())
  .filter(x => x.length)
  .join('|')})`)
export const modify = (m, x) => X(`(${x.source})${m}`)
