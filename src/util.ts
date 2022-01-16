import { CodeSyntaxElement } from '.'

export interface PatchOptions {
  theme: string
  getLanguage: (el: Element) => string
}

export const patchElements = (
  elements: Element[],
  {
    theme = 'monokai',
    getLanguage = el =>
      [...el.classList]
        .filter(x => x.startsWith('language-'))[0]
        .split('-')
        .pop()!,
  } = {} as Partial<PatchOptions>
) =>
  elements.forEach(oldEl => {
    const newEl = new CodeSyntaxElement()
    newEl.textContent = oldEl.textContent
    newEl.setAttribute('theme', theme)
    newEl.setAttribute('language', getLanguage(oldEl))
    oldEl.replaceWith(newEl)
  })

export const patchPreCodeElements = (opts: Partial<PatchOptions>) =>
  patchElements(
    [...document.querySelectorAll('code')].filter(el => el.parentNode?.nodeName === 'PRE'),
    opts
  )
