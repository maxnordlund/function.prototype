if (!Function.prototype.apply) {
  function apply(object, parameters) {
    return _apply(this, object, parameters);
  };
  Function.prototype.apply = apply;
  apply = null;
}

if (!Function.prototype.call) {
  function call(object /*...parameters*/) {
    var i, parameters = new Array();

    for (i = 0; i < arguments.length; ++i) {
      parameters[parameters.length] = arguments[i];
    }

    return _apply(this, object, parameters);
  };
  Function.prototype.call = call;
  call = null;
}

if (!Function.prototype.bind) {
  function bind(object /*...parameters*/) {
    var i, bound, parameters = new Array();

    object = Object(object);

    for (i = 0; i < arguments.length; ++i) {
      parameters[parameters.length] = arguments[i];
    }

    bound = new Function(
      "var parameters = callee['%%-parameters'];\n" +
      "for (var j = 0; j < arguments.length; ++j) {\n" +
      "  parameters[parameters.length] = arguments[j];\n" +
      "}\n" +
      "return _apply(callee['%%-fn'], callee['%%-object'], parameters);"
    );
    bound["%%-parameters"] = parameters;
    bound["%%-object"] = object;
    bound["%%-fn"] = this;
    return bound
  };
  Function.prototype.bind = bind;
  bind = null;
}

function _apply(fn, object, parameters) {
  var i, result, symbol, parameterList new Array();

  object = Object(object);

  // Find unused property, use illegal identifer to narrow the search
  for (symbol = "%%"; symbol in object; symbol = "%%" + random());

  // Build list of parameters
  for (i = 0; i < parameters.length; ++i) {
    parameterList[i] = "parameters[" + i + "]";
  }

  object[symbol] = fn;
  result = eval("object[symbol](" + _join(parameterList, ", ") + ")");
  object[symbol] = null;

  return result
}

/**
 * O(n log n) string concatenation
 */
function _join(strings, seperator) {
  if (strings.length === 0) return "";
  if (strings.length === 1) return "" + strings[0];

  var i, input = strings, output = [input[0]];

  for (i = 1; i < input.length; ++i) {
    // Prepending the seperator like this ensures no trailing seperator
    output[output.length] = seperator + input[i];
  }

  while (output.length > 1) {
    input = output, output = [];

    for (i = 1; i < input.length; i += 2) {
      output[output.length] = input[i-1] + input[i];
    }

    if (i === input.length) {
      output[output.length] = input[i-1];
    }
  }

  return output[0];
}
