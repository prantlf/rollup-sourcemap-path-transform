# rollup-sourcemap-path-transform

[![Latest version](https://img.shields.io/npm/v/rollup-sourcemap-path-transform)
 ![Dependency status](https://img.shields.io/librariesio/release/npm/rollup-sourcemap-path-transform)
](https://www.npmjs.com/package/rollup-sourcemap-path-transform)
[![Coverage](https://codecov.io/gh/prantlf/rollup-sourcemap-path-transform/branch/master/graph/badge.svg)](https://codecov.io/gh/prantlf/rollup-sourcemap-path-transform)

Function [sourcemapPathTransform] for [Rollup] to rebase sources in source maps, so that they start with the same path prefix. Helps grouping all your sources in the same node in the source tree, when using the debugger in the browser developer tools.

## Synopsis

```js
import { createPathTransform } from 'rollup-sourcemap-path-transform'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    sourcemap: true,
    // Rebase all source map sources to /compi
    sourcemapPathTransform: createPathTransform({
      prefixes: {
        '*src/components/': '/compi/comps/',
        '/node_modules/': '/compi/deps/'
      }
    })
  }
}
```

## Installation

Make sure that you use [Node.js] 14 or newer and [Rollup] 2 or newer. Use your favourite package manager - [NPM], [PNPM] or [Yarn]:

```sh
npm i -D rollup-sourcemap-path-transform
pnpm i -D rollup-sourcemap-path-transform
yarn add -D rollup-sourcemap-path-transform
```

## Usage

Edit a `rollup.config.js` [configuration file], import the `createPathTransform` function, call it to create a transformation method and assign it to the `sourcemapPathTransform` property of the `output` configuration:

```js
import { createPathTransform } from 'rollup-sourcemap-path-transform'

const sourcemapPathTransform = createPathTransform({
  prefixes: {
    '*src/': '/myproj/'
  }
})

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    sourcemap: true,
    sourcemapPathTransform
  }
}
```

Then call `rollup` either via the [command-line] or [programmatically].

## Options

The following options can be passed in an object to the `createPathTransform` function.

### `prefixes`

Type: `Object`<br>
Default: `{}`

Map of path prefixes to path replacements. The prefixes will be searched in the declared order and as soon as the first will match the beginning of the source path, it will be replaced with the value in the map tuple. If a prefix start with an asterisk (`*`) it will be search anywhere in the source path.

### `requirePrefix`

Type: `Boolean`<br>
Default: `false`

If enabled and no prefix is detected in a source path, the transformation will fail by throwing an error.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Lint and test your code.

## License

Copyright (C) 2022 Ferdinand Prantl

Licensed under the [MIT License].

[MIT License]: http://en.wikipedia.org/wiki/MIT_License
[Rollup]: https://rollupjs.org/
[Node.js]: https://nodejs.org/
[NPM]: https://www.npmjs.com/
[PNPM]: https://pnpm.io/
[Yarn]: https://yarnpkg.com/
[configuration file]: https://www.rollupjs.org/guide/en/#configuration-files
[command-line]: https://www.rollupjs.org/guide/en/#command-line-reference
[programmatically]: https://www.rollupjs.org/guide/en/#javascript-api
[sourcemapPathTransform]: https://rollupjs.org/guide/en/#outputsourcemappathtransform
