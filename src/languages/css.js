import js from './js.js'
import { join, split } from './util.js'

const comment = join('|',
  /(\/\*)[^]*?(\*\/)/,
  /(\/\*)[^]*/
)

/** @type {import("../").SyntaxDefinition} */
export default {
  comment,
  attribute: [
    /(?<=\[)[^\]]*?(?=\])/,
    {
      string: js.string,
      attribute: /\w+?/
    }
  ],
  rules: [
    /\{[^]*?\}/,
    {
      comment,
      string: js.string,
      normal: /--[\w-]+/,
      declare: join('|',
        /[\w-]+(?=:)/,
        split('var url ch px pt em rem vw vh vmax vmin'),
      ),
      number: join('|',
        js.number,
        /#[a-fA-F0-9]+/
      ),
      value: /(?<=:)[\sa-z-]*(?=;|.*})/,
    }
  ],
  tag: /[\w-]+/,
  property: /[.#][^\s]+/,
  operator: js.operator,
}
