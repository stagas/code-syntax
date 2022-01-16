import fs from 'fs'
import path from 'path'

import * as languages from '../../languages'
import { SyntaxDefinition, compile, syntax } from '../syntax'

const fixturesPath = path.resolve(path.join(__dirname, '__fixtures__'))

for (const [lang, def] of Object.entries(languages) as [string, SyntaxDefinition][]) {
  const fixtures = fs.readdirSync(path.join(fixturesPath, lang))
  describe(lang, () => {
    fixtures.forEach(fixtureName => {
      const filename = path.join(fixturesPath, lang, fixtureName)

      it(fixtureName, async () => {
        const regexp = await compile(def)
        expect(syntax(regexp, fs.readFileSync(filename, 'utf8'))).toMatchSnapshot()
      })
    })
  })
}
