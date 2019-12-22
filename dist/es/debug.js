import 'core-js/modules/es.array.concat';
import 'core-js/modules/es.array.map';
import 'core-js/modules/es.array.some';
import 'core-js/modules/es.regexp.constructor';
import 'core-js/modules/es.regexp.exec';
import 'core-js/modules/es.regexp.to-string';
import 'core-js/modules/es.string.replace';
import 'core-js/modules/es.string.split';

var loadDebugValue = function loadDebugValue() {
  // NOTE: This is necessary because safari throws when a user disables
  // cookies/localstorage and you attempt to access it.
  var storage;

  try {
    // NOTE: TVMLKit (Apple TV JS Runtime) does not have a window object, just
    // localStorage in the global context. The Browser also has localStorage in
    // the global context.
    // eslint-disable-next-line
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
function debug(name, log) {
  if (log === void 0) {
    log = console.debug || console.log || function () {
      return null;
    };
  }

  return namePatterns.some(function (pattern) {
    return pattern.test(name);
  }) ? function (message) {
    for (var _len = arguments.length, optionalParams = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      optionalParams[_key - 1] = arguments[_key];
    }

    return log.apply(void 0, [name, message].concat(optionalParams));
  } : function () {
    return null;
  };
}

export default debug;
