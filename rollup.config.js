'use strict'

/* -----------------------------------------------------------------------------
 * dependencies
 * -------------------------------------------------------------------------- */

import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'

/* -----------------------------------------------------------------------------
 * rollup config
 * -------------------------------------------------------------------------- */

const sharedPlugins = [
  babel({
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx'],
    exclude: 'node_modules/**'
  })
]

export default [
  {
    input: 'src/debug.ts',
    plugins: [...sharedPlugins],
    output: {
      file: 'dist/debug.js',
      format: 'umd',
      name: 'debugProp',
      exports: 'named'
    }
  },
  {
    input: 'src/debug.ts',
    plugins: [...sharedPlugins],
    output: {
      file: 'dist/common/debug.js',
      format: 'cjs',
      exports: 'named'
    }
  },
  {
    input: 'src/debug.ts',
    plugins: [...sharedPlugins],
    output: {
      file: 'dist/es/debug.js',
      format: 'es'
    }
  },
  {
    input: 'src/debug.ts',
    plugins: [...sharedPlugins, terser()],
    output: {
      file: 'dist/debug.min.js',
      format: 'umd',
      name: 'debugProp',
      exports: 'named'
    }
  }
]
