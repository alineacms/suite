import type {Suite} from './src/suite.d.ts'

/** Define a test suite */
export const suite: Suite = (
  await ('Bun' in globalThis
    ? import('./src/suite.bun.js')
    : 'Deno' in globalThis
      ? import('./dist/suite.deno.js')
      : import('./src/suite.node.js'))
).suite
