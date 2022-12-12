import { fail, strictEqual } from 'assert'
import { fileURLToPath } from 'url'
import tehanu from 'tehanu'
import { createPathTransform } from '../lib/index.js'

const test = tehanu(fileURLToPath(import.meta.url))

test('rebases by prefixes', () => {
  const rebase = createPathTransform({
    prefixes: {
      '*src/components/': '/compi/comps/',
      'node_modules/': '/compi/deps/'
    }
  })
  strictEqual(rebase('/src/components/index.js'), '/compi/comps/index.js')
  strictEqual(rebase('node_modules/lit/index.js'), '/compi/deps/lit/index.js')
  strictEqual(rebase('page/index.js'), 'page/index.js')
})

test('rebases with backslashes in the configuration', () => {
  const rebase = createPathTransform({
    prefixes: {
      '*src\\components\\': '/compi/comps/',
      'node_modules\\': '/compi/deps/'
    }
  })
  strictEqual(rebase('/src/components/index.js'), '/compi/comps/index.js')
  strictEqual(rebase('node_modules/lit/index.js'), '/compi/deps/lit/index.js')
  strictEqual(rebase('page/index.js'), 'page/index.js')
})

test('rebases with backslashes in the file paths', () => {
  const rebase = createPathTransform({
    prefixes: {
      '*src/components/': '/compi/comps/',
      'node_modules/': '/compi/deps/'
    }
  })
  strictEqual(rebase('\\src\\components\\index.js'), '/compi/comps/index.js')
  strictEqual(rebase('node_modules\\lit\\index.js'), '/compi/deps/lit/index.js')
  strictEqual(rebase('page\\index.js'), 'page/index.js')
})

test('reports unrecognised path', () => {
  const rebase = createPathTransform({ requirePrefix: true })
  try {
    rebase('page/index.js')
    fail('processed unrecognised path')
  } catch ({ message }) {
    strictEqual(message, `Unrecognised path: page/index.js`)
  }
})
