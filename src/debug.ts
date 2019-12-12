'use strict'

/* -----------------------------------------------------------------------------
 * debug
 * Modified concepts from: https://github.com/visionmedia/debug
 * -------------------------------------------------------------------------- */

type DebugValue = ReturnType<typeof loadDebugValue>

const loadDebugValue = () => {
  // NOTE: This is necessary because safari throws when a user disables
  // cookies/localstorage and you attempt to access it.
  // NOTE: TVMLKit (Apple TV JS Runtime) does not have a window object, just
  // localStorage in the global context. The Browser also has localStorage in
  // the global context.
  let storage
  try {
    storage = localStorage
  } catch (e) {}

  try {
    // @ts-ignore: unknown environment. This is a known and captured error state
    return storage.getItem('debug')
  } catch (error) {}

  try {
    return process.env.DEBUG
  } catch (error) {}
}

const parseDebugValue = (debugValue: DebugValue) =>
  debugValue
    ? debugValue
      .split(/[\s,]+/)
      .map((val: string) => new RegExp('^' + val.replace(/\*/g, '.*?') + '$'))
    : []

const namePatterns = parseDebugValue(loadDebugValue())

export default function debug (
  name: string,
  log = console.debug || console.log || (() => null)
) {
  return namePatterns.some(pattern => pattern.test(name)) ? log : () => null
}
