import {suite} from '#suite'

const test = suite(import.meta, {
  status: '',
  beforeAll() {
    this.status = 'beforeAll'
  },
  beforeEach() {
    if (this.status !== 'beforeAll' && this.status !== 'afterEach')
      throw new Error(`hooks did not run, ${this.status}`)
    this.status = 'beforeEach'
  },
  afterEach() {
    this.status = 'afterEach'
  },
  afterAll() {
    if (this.status !== 'afterEach')
      throw new Error(`hooks did not run, ${this.status}`)
  }
})

test('before each', ctx => {
  test.equal(ctx.status, 'beforeEach')
})

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

test('options', { timeout: 1000 }, () => {
  test.ok(true)
})

/*test.only('only', () => {
    test.ok(true)
  })*/
