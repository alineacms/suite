import {suite} from '#suite'

suite(import.meta, test => {
  test('truthy', () => {
    test.ok(true)
  })

  test('falsy', () => {
    test.not.ok(false)
  })

  test('equal', () => {
    test.equal({a: 1}, {a: 1})
  })

  test('not equal', () => {
    test.not.equal({a: 1}, {a: 2})
  })

  test('strict equal', () => {
    test.is(1, 1)
  })

  test('not strict equal', () => {
    test.not.is(1, '1')
  })

  test('throws', () => {
    test.throws(() => {
      throw new Error('ok')
    })
  })

  test('throws message', () => {
    test.throws(() => {
      throw new Error('a message')
    }, 'message')
  })

  test.skip('skip', () => {
    test.ok(false)
  })

  test('async', async () => {
    test.ok(true)
  })

  /*test.only('only', () => {
    test.ok(true)
  })*/
})
