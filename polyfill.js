function __init_function_polyfill(Object, Function, random) {
  if (!Function.prototype.apply) {
    function apply(object, parameters) {
      return _apply(this, object, parameters);
    };
    Function.prototype.apply = apply;
    apply = null;
  }

  if (!Function.prototype.call) {
    function call(object /*...parameters*/) {
      var i, parameters = [];

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
      var i, fn = this, parameters = [];

      for (i = 0; i < arguments.length; ++i) {
        parameters[parameters.length] = arguments[i];
      }

      function bound(/*...parameters*/) {
        for (var j = 0; j < arguments.length; ++j) {
          parameters[parameters.length] = arguments[j];
        }
        return _apply(fn, object, parameters);
      };
      return bound
    };
    Function.prototype.bind = bind;
    bind = null;
  }

  function _apply(fn, object, parameters) {
    var i, result, symbol, parameterList = [];

    object = Object(object);

    // Find unused property, use illegal identifer to narrow the search
    for (symbol = "%%"; symbol in object; symbol = "%%" + random());

    // Build list of parameters
    for (i = 0; i < parameters.length; ++i) {
      parameterList[i] = "parameters[" + i + "]";
    }

    object[symbol] = fn;
    result = eval("object[symbol](" + _join(parameterList, ", ") + ")");
    delete object[symbol];

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
}
__init_function_polyfill(Object, Function, Math.random)
__init_function_polyfill = null
delete __init_function_polyfill
