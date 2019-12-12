/* eslint-env mocha */
'use strict'

/* -----------------------------------------------------------------------------
 * dependencies
 * -------------------------------------------------------------------------- */

// lib
import debug from './debug'

/* -----------------------------------------------------------------------------
 * test
 * -------------------------------------------------------------------------- */

describe('debug', function () {
  test('Should log.', () => {
    let debugged = [false, false]
    debug('debug', () => (debugged[0] = true))()
    debug('debug:test', () => (debugged[1] = true))()

    expect(debugged[0]).toBe(
      process.env.DEBUG === '*' || process.env.DEBUG === 'debug'
    )
    expect(debugged[1]).toBe(
      process.env.DEBUG === '*' || process.env.DEBUG === 'debug:*'
    )
  })
})
