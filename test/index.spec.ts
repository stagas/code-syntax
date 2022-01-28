import { CodeSyntaxElement } from '../src'

describe('CodeSyntaxElement', () => {
  it('can be defined as a custom element', () => {
    customElements.define('code-syntax', CodeSyntaxElement)
    const el = document.createElement('code-syntax')
    expect(el).toBeInstanceOf(CodeSyntaxElement)
  })
})
