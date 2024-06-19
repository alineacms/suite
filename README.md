# suite

[![NPM Version](https://img.shields.io/npm/v/@benmerckx/suite)](https://www.npmjs.com/package/@benmerckx/suite)
[![JSR](https://jsr.io/badges/@benmerckx/suite)](https://jsr.io/@benmerckx/suite)

Describe tests that run in the native test runners of Node.js, Deno and Bun.

## example

````ts
// example.test.js
import {suite} from '@benmerckx/suite'

suite(import.meta, test => {
  test('is', () => {
    test.is(1, 1)
  })

  test('deep equal', () => {
    test.equal({a: 1}, {a: 1})
  })

  test('async', async () => {
    await new Promise(resolve => setTimeout(resolve, 100))
    test.ok(true)
  })

  test('throws', () => {
    test.throws(() => {
      throw new Error('test')
    }, 'test')
  })

  test.skip('skip', () => {
    test.ok(false)
  })
})
````

Run with:
- `node --test`
- `bun test`
- `deno test`

## api

````ts
/** Define a test suite */
export function suite(meta: ImportMeta, define: (test: DefineTest) => void): void

/** Describe a test */
export type Describe =
  (name: string, run: () => void | Promise<void>): void

/** Define a test suite */
export interface DefineTest extends Describe {
  /** Skip the test */
  skip: Describe
  /** Only run this test */
  only: Describe
  /** Assert that actual is a truthy value */
  ok(actual: any): void
  /** Assert that actual strictly equals (===) the expects value */
  is(actual: any, expects: any): void
  /** Assert that actual is deeply equal to the expects value */
  equal(actual: any, expects: any): void
  /** Assert that the fn function throws an Error */
  throws(fn: () => void, messageIncludes?: string): void
  /** Assert inverse */
  not: {
    /** Assert that actual is a falsy value */
    ok(actual: any): void
    /** Assert that actual does not strictly equal (===) the expects value */
    is(actual: any, expects: any): void
    /** Assert that actual is not deeply equal to the expects value */
    equal(actual: any, expects: any): void
  }
}
````
