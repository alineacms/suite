var isBun = 'Bun' in globalThis
var isDeno = !isBun && 'Deno' in globalThis
var isNode = !isDeno && 'process' in globalThis

var setup

if (isBun) {
  const {expect} = await import('bun:test')
  setup = meta => {
    const native = Bun.jest(meta.path).test
    const test = native.bind()
    test.skip = native.skip
    test.only = native.only.bind(native)
    test.ok = a => expect(a).toBeTruthy()
    test.is = (a, b) => expect(a).toBe(b)
    test.equal = (a, b) => expect(a).toEqual(b)
    test.throws = (fn, err) => 
      err === undefined ? expect(fn).toThrow() : expect(fn).toThrow(err)
    test.not = {
      ok: a => expect(a).toBeFalsy(),
      is: (a, b) => expect(a).not.toBe(b),
      equal: (a, b) => expect(a).not.toEqual(b)
    }
    return test
  }
      
} else if (isNode) {
  try {
    const asserts = await import('node:assert')
    const native = await import('node:test')
    const test = native.test.bind()
    test.skip = native.skip
    test.only = native.only
    test.ok = asserts.ok
    test.is = asserts.strictEqual
    test.equal = asserts.deepStrictEqual
    test.throws = asserts.throws
    test.not = {
      ok: a => asserts.ok(!a),
      is: asserts.notStrictEqual,
      equal: asserts.notDeepStrictEqual
    }
    setup = () => test
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
} else if (isDeno) {
  const asserts = await import('https://deno.land/std/testing/asserts.ts')
  const native = Deno.test
  const test = native.bind()
  test.skip = native.ignore
  test.only = native.only
  test.ok = asserts.assert
  test.is = asserts.assertStrictEquals
  test.equal = asserts.assertEquals
  test.throws = asserts.assertThrows
  test.not = {
    ok: asserts.assertFalse,
    is: asserts.assertNotStrictEquals,
    equal: asserts.assertNotEquals
  }
  setup = () => test
} else {
  throw new Error(`Unsupported runtime`)
}

export function suite(meta, define) {
  return define(setup(meta))
}
