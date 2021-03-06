import { join, split, modify } from './util.js'

/** @type {import("../").SyntaxDefinition} */
const R = {
  comment: [
    join('|',
      /(\/\*)[^]*?(\*\/)/,
      /(\s?(\/\/)[\S\s]*?(?=[\n\r]))/,
      /(\/\*)[^]*/
    ),
    {
      _: [
        /@\w*\s?[\w:/.-]+/,
        {
          comment: /(?<=@returns)\s\w+/,
          declare: /@\w+/,
        }
      ],
      comment: /.+?/
    }
  ],
  keyword: join('',
    /\b/,
    split(`
      break do instanceof typeof case else new try catch finally
      return continue for of switch while with debugger default
      if throw delete in as from export import async await void
      extends implements private public package protected static
      declare yield
    `),
    /\b(?![:()])/,
  ),
  declare: join('',
    /\b(?![:])/,
    split(`
      class function constructor prototype
      const get set var let interface type
      enum string boolean number any unknown never
      Object String Number RegExp Buffer Math
      Set Map
    `),
    /\b(?![:])/,
  ),
  function: join('|',
    /[$#\w]+(?=(\s=)?\s*[<(`])/,
    /(?<=(class|interface)\s+)\w+(?=(<\w>)?\s*((extends|implements)\s*[\w<>]+\s*(implements\s*\w+\s*)?)?\s*\{)/,
    /(?<=extends\s+)\w+/,
    /(?<=implements\s+)\w+/
  ),
  arrow: /=>/,
  builtin: split(`true false null undefined NaN Infinity`),
  imports: [
    /(?<=import|export).*[\w{}*]+(?=\sfrom\s)/,
    {
      keyword: /\sas\s/,
      builtin: /\*/ // highlights the asterisk import
    }
  ],
  special: split('this super'),
  regexp: [
    /\/((?:\\\/)|[^/\n\s])+?\/[gimsuy]*/,
    {
      builtin: /\\.*?\]|\\[^]/,
      operator: /[\^+*?]/,
      string: /.+?/,
    }
  ],
  string: join('|',
    /('(?:(?:\\\n|\\'|[^'\n]))*'?)/,
    /("(?:(?:\\\n|\\"|[^"\n]))+"?)/,
//    /(`(?:(?:\\`|[^`]))*`?)/
  ),
  arguments: null, // placeholder for precedence, we complete below
  property: /\w+(?=:)/,
  punctuation: `[ ] ( ) { } ; ,`,
  number: join('',
    join('',
      /(?=\.\d|\d)/,
      /(?:\d+)?/,
      /(?:\.?\d*)/
    ),
    /(?:[eE]([+-]?\d+))?/
  ),
  operator: modify('{1}',
    split(`
      : + - ~ !
      ** ?? ?. >> << >>> < > <= >= == != === !==
      && || *= /= %= += -= <<= >>= >>>= &= ^= |= **=
      = ? ... * / % & ^ | ++ --
    `)
  ),
}

R.arguments = [
  join('|',
    /\w+\s+(?==>)/,
    join('',
      /(?<=(function\s+\w+|async)\s*\([^\s]*)/,
      /(?<=\([^)]*)/,
      /[^)]*/,
      /(?=.*(=>|{))/
    ),
    join('',
      /(?<!(if|for|while|switch).*)/,
      /(?<=\()[^)]*(?=\).+{)/
    ),
    join('',
      /(?<!(if|for|while|switch).*)/,
      // /(?<=([=:,]|=>)\s*\([^\s]*)/,
      /(?<=\([^)]*)/,
      /[^)]*/,
      /(?=.*(=>|{))/
    ),
  ),
  {
    _: [
      /(?:[:=|<]\s?)\w+/, // types and defaults are highlighted as js
      { ...R, arguments: null }
    ],
    ...R, // inherit everything from js
    arguments: /[$\w]+/, // override the arguments
  }
]

R.template = [
  /(`(?:(?:\\`|[^`]))*`?)/,
  {
    template: [
      /\$\{[^]*?\}/,
      {
        ...R,
        operator: join('|', R.operator, /\$\{|}/),
      }
    ],
    string: /.+?/
  }
]

export default R
