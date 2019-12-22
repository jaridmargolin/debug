'use strict'

/* -----------------------------------------------------------------------------
 * dependencies
 * -------------------------------------------------------------------------- */

// 3rd party
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'

/* -----------------------------------------------------------------------------
 * rollup config
 * -------------------------------------------------------------------------- */

const externals = [
  'core-js/modules/es.array.concat',
  'core-js/modules/es.array.map',
  'core-js/modules/es.array.some',
  'core-js/modules/es.regexp.constructor',
  'core-js/modules/es.regexp.exec',
  'core-js/modules/es.regexp.to-string',
  'core-js/modules/es.string.replace',
  'core-js/modules/es.string.split'
]

const sharedPlugins = [
  resolve({
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx', '.json']
  }),
  commonjs(),
  babel({
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx'],
    exclude: 'node_modules/**'
  })
]

export default [
  {
    input: 'src/debug.ts',
    external: externals,
    plugins: [...sharedPlugins],
    output: {
      file: 'dist/common/debug.js',
      format: 'cjs',
      exports: 'named'
    }
  },
  {
    input: 'src/debug.ts',
    external: externals,
    plugins: [...sharedPlugins],
    output: {
      file: 'dist/es/debug.js',
      format: 'es'
    }
  },
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
    plugins: [...sharedPlugins, terser()],
    output: {
      file: 'dist/debug.min.js',
      format: 'umd',
      name: 'debugProp',
      exports: 'named'
    }
  }
]
