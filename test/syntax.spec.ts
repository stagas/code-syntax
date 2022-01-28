import { compile, syntax } from '../src/syntax'

describe('compile', () => {
  it('simple object single rule', async () => {
    const r = await compile({
      foo: /[a-z]/,
    })
    expect(r.source).toEqual('(?<foo>[a-z])')
    expect([...r.keys!]).toEqual(['foo'])
  })

  it('promise module', async () => {
    const r = await compile(
      Promise.resolve({
        default: {
          foo: /[a-z]/,
        },
      })
    )
    expect(r.source).toEqual('(?<foo>[a-z])')
    expect([...r.keys!]).toEqual(['foo'])
  })

  it('simple object multiple rules', async () => {
    const r = await compile({
      foo: /[a-z]/,
      bar: /[0-9]/,
    })
    expect(r.source).toEqual('(?<foo>[a-z])|(?<bar>[0-9])')
    expect([...r.keys!]).toEqual(['foo', 'bar'])
  })

  it('simple object nested rules', async () => {
    const r = await compile({
      foo: /[a-z]/,
      bar: [
        /[0-9]/,
        {
          bar: /[0-5]/,
        },
      ],
    })
    expect(r.source).toEqual('(?<foo>[a-z])|(?<bar>[0-9])')
    expect([...r.keys!]).toEqual(['foo', 'bar'])
    expect(r.map!['bar'].source).toEqual('(?<bar>[0-5])')
  })
})

describe('syntax', () => {
  it('simple named group regexp', () => {
    const regexp = /(?<foo>[a-z]+)/g
    const result = syntax(regexp, 'hello 123 world')
    expect(result).toMatchSnapshot()
  })

  it('multiple named group regexp', () => {
    const regexp = /(?<foo>[a-z]+)|(?<bar>[0-9]+)/g
    const result = syntax(regexp, 'hello 123 world')
    expect(result).toMatchSnapshot()
  })

  it('mapped regexp', async () => {
    const regexp = await compile({
      foo: /[a-z]+/,
      bar: [
        /[0-9]+/,
        {
          bar: /[0-5]+/,
        },
      ],
    })
    const result = syntax(regexp, 'hello 123 789 world')
    expect(result).toMatchSnapshot()
  })
})
