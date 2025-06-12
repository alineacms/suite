/** Describe a test */
export interface Describe<Context = void> {
  (name: string, run: (context: Context) => void | Promise<void>): void
  (
    name: string,
    options: Record<string, unknown>,
    run: (context: Context) => void | Promise<void>
  ): void
}

interface Assert {
  /** Assert that actual is a truthy value */
  ok(actual: any): void
  /** Assert that actual strictly equals (===) the expects value */
  is(actual: any, expects: any): void
  /** Assert that actual is deeply equal to the expects value */
  equal(actual: any, expects: any): void
  /** Assert that the fn function throws an Error */
  throws(fn: () => Promise<unknown>, messageIncludes?: string): Promise<void>
  /** Assert that the fn function throws an Error */
  throws(fn: () => unknown, messageIncludes?: string): void
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

interface Hooks {
  /** Run this before all tests */
  beforeAll?(fn: () => void | Promise<void>): void
  /** Run this before each test */
  beforeEach?(fn: () => void | Promise<void>): void
  /** Run this after all tests */
  afterAll?(fn: () => void | Promise<void>): void
  /** Run this after each test */
  afterEach?(fn: () => void | Promise<void>): void
}

/** Define a test suite */
export interface DefineTest<Context = void> extends Describe<Context>, Assert {
  /** Skip the test */
  skip: Describe<Context>
  /** Only run this test */
  only: Describe<Context>
}

/** Define a test suite */
export interface Suite {
  <Context extends Hooks>(
    meta: ImportMeta,
    context?: Context
  ): DefineTest<Context>
  (meta: ImportMeta, define: (test: DefineTest) => void): void
}

export const suite: Suite