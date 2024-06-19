import * as asserts from 'node:assert'
import * as native from 'node:test'

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

export const suite = (meta, define) => define(test)
