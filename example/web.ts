import 'plenty-themes/laser.css'
import 'code-syntax/themes/default.css'

import { CodeSyntaxElement, languages } from 'code-syntax'

customElements.define('code-syntax', CodeSyntaxElement)

languages.js = import('code-syntax/languages/js')

document.querySelector('main').innerHTML = `
<code-syntax language="js" theme="laser">class Vector {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
  add(v: Vector): Vector {
    return new Vector(this.x + v.x, this.y + v.y)
  }
}
</code-syntax>
`
