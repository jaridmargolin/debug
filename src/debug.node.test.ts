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
    const debugSpy = jest.spyOn(console, 'debug')

    debug('debug')('my message')
    debug('debug:test')('my message')

    let expected: string[][] = []
    if (process.env.DEBUG === '*') {
      expected = [
        ['debug', 'my message'],
        ['debug:test', 'my message']
      ]
    } else if (process.env.DEBUG === 'debug') {
      expected = [['debug', 'my message']]
    } else if (process.env.DEBUG === 'debug:*') {
      expected = [['debug:test', 'my message']]
    }

    expect(debugSpy.mock.calls).toEqual(expected)
  })
})
