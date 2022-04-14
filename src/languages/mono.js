import { join, modify } from './util.js'

const ids = /[a-zA-Z_$][a-zA-Z0-9_$]*/
const num = /inf|nan|\d[\d_]*(\.((e[+-]?)?[\d]+)+[kBb]*|(e[+-]?[\d]+)?[kBb]*)/
const ops = /\+\+|--|\+=|-=|\*=|\/=|%=|<<=|>>=|&=|\^=|\|=|&&|!&|\|\||!=|==|>=|<=|>>|<<|\.\.|[{}\\"'`,\-~+*/%=<>?!:;.|&^@]{1}/

/** @type {import("../").SyntaxDefinition} */
export default {
  declare: [
    join('',
      modify('+',
        join('|',
          ids,
          num,
          ops,
          /[[\](),.=\s+]/
        ),
      ),
      /\)\s+=/
    ),
    {
      arguments: [
        /(?<=\().*?(?=\))/,
        {
          declare: num,
          string: /[[\]]/,
          arguments: /\w+/,
          operator: ops,
        }
      ],
      arrow: /=$/,
      declare: ids,
      operator: ops,
      punctuation: /[[\]()]/,
    }
  ],
  property: join('', ids, /(?=\()/),
  number: num,
  string: /[[\]()]/,
  punctuation: /[[\](),]/,
  operator: ops,
}
