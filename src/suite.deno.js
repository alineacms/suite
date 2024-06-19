import {
  assert,
  assertEquals,
  assertFalse,
  assertNotEquals,
  assertNotStrictEquals,
  assertStrictEquals,
  assertThrows
} from '../node_modules/@jsr/std__assert/mod.js'

const native = Deno.test
const test = native.bind()
test.skip = native.ignore
test.only = native.only
test.ok = assert
test.is = assertStrictEquals
test.equal = assertEquals
test.throws = assertThrows
test.not = {
  ok: assertFalse,
  is: assertNotStrictEquals,
  equal: assertNotEquals
}

export const suite = (meta, define) => define(test)
