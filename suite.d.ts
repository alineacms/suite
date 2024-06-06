export interface Describe {
  (name: string, run: ()=> void | Promise<void>): void
}

export interface DefineTest extends Describe {
  /** Skip the test. */
  skip: Describe
  /** Only run this test. */
  only: Describe
  /** Assert that actual is a truthy value. */
  ok(actual: any): void
  /** Assert that actual strictly equals (===) the expects value. */
  is(actual: any, expects: any): void
  /** Assert that actual is deeply equal to the expects value. */
  equal(actual: any, expects: any): void
  /** Assert that the fn function throws an Error. */
  throws(fn: () => void, messageIncludes?: string): void
  not: {
    /** Assert that actual is a falsy value. */
    ok(actual: any): void
    /** Assert that actual does not strictly equal (===) the expects value. */
    is(actual: any, expects: any): void
    /** Assert that actual is not deeply equal to the expects value. */
    equal(actual: any, expects: any): void
  }
}

interface DefineSuite {
  (test: DefineTest): void
}

export function suite(meta: ImportMeta, define: DefineSuite): void