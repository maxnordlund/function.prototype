exports.apply = apply
function apply(object, parameters) {
  return _apply(this, object, parameters)
}

exports.call = call
function call(object, /*...parameters*/) {
  var i, parameters = []

  for (i = 0; i < arguments.length; ++i) {
    parameters[parameters.length] = arguments[i]
  }

  return _apply(this, object, parameters)
}

exports.bind = bind
function bind(object, /*...parameters*/) {
  var i, fn = this, parameters = []

  for (i = 0; i < arguments.length; ++i) {
    parameters[parameters.length] = arguments[i]
  }

  return function bound(/*...parameters*/) {
    for (var j = 0; j < arguments.length; ++j) {
      parameters[i+j] = arguments[j]
    }
    return _apply(fn, object, parameters)
  }
}

exports._apply = _apply
function _apply(fn, object, parameters) {
  var i, symbol, parameterList = []

  object = Object(object)

  // Find unused property, use illigal identifer to narrow the search
  for (symbol = "%%"; symbol in object; symbol = "%%" + Math.random()) {};

  // Build list of parameters
  for (i = 0; i < parameters.length; ++i) {
    parameterList[i] = "parameters[" + i + "]"
  }

  try {
    object[symbol] = fn
    return eval("object[symbol](" + join(parameterList, ", ") + ")")
  } finally {
    delete object[symbol]
  }
}

/**
 * O(n log n) string concatenation
 */
exports.join = join
function join(strings, seperator) {
  if (strings.length === 0) return ""
  if (strings.length === 1) return "" + strings[0]

  var i, input = strings, output = [input[0]]

  for (i = 1; i < input.length; ++i) {
    // Prepending the seperator like this ensures no trailing seperator
    output[output.length] = seperator + input[i]
  }

  while (output.length > 1) {
    input = output, output = []

    for (i = 1; i < input.length; i += 2) {
      output[output.length] = input[i-1] + input[i]
    }

    if (i === input.length) {
      output[output.length] = input[i-1]
    }
  }

  return output[0]
}
