import 'plenty-themes/cobalt2.css'
import 'plenty-themes/laser.css'
import '../themes/default.css'

import { CodeSyntaxElement, languages } from '../src'
import js from '../src/languages/js'

customElements.define('code-syntax', CodeSyntaxElement)

languages.js = js // can also be import(...) directly

document.body.innerHTML = `
<code-syntax id="demo" style="display:inline-flex;" language="js" theme="laser">class Vector {
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
