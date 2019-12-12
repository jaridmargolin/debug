/* -----------------------------------------------------------------------------
 * debug
 * Modified concepts from: https://github.com/visionmedia/debug
 * -------------------------------------------------------------------------- */

var loadDebugValue = function loadDebugValue() {
  // NOTE: This is necessary because safari throws when a user disables
  // cookies/localstorage and you attempt to access it.
  // NOTE: TVMLKit (Apple TV JS Runtime) does not have a window object, just
  // localStorage in the global context. The Browser also has localStorage in
  // the global context.
  var storage;

  try {
    storage = localStorage;
  } catch (e) {}

  try {
    // @ts-ignore: unknown environment. This is a known and captured error state
    return storage.getItem('debug');
  } catch (error) {}

  try {
    return process.env.DEBUG;
  } catch (error) {}
};

var parseDebugValue = function parseDebugValue(debugValue) {
  return debugValue ? debugValue.split(/[\s,]+/).map(function (val) {
    return new RegExp('^' + val.replace(/\*/g, '.*?') + '$');
  }) : [];
};

var namePatterns = parseDebugValue(loadDebugValue());
function debug(name) {
  var log = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : console.debug || console.log || function () {
    return null;
  };
  return namePatterns.some(function (pattern) {
    return pattern.test(name);
  }) ? log : function () {
    return null;
  };
}

export default debug;
