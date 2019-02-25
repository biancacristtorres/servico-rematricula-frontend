var toCamelCase = function (str) {
  return str
    .replace(/\s(.)/g, function ($1) {
      return $1.toUpperCase();
    })
    .replace(/\s/g, '')
    .replace(/[^\w]/g, '')
    .replace(/^(.)/, function ($1) {
      return $1.toLowerCase();
    });
};

function TsFlowSyntax(interfaceType) {
  return {
    build: function build ({ comment, generatedExpressions, functionName, stepParameterNames }) {
      var pattern = generatedExpressions[0]._expressionTemplate;
      var parameters = stepParameterNames;
      var methodName = toCamelCase(pattern);
      var paramBoundary = ': string, ';

      if (interfaceType === 'callback') {
        var callbackName = parameters[parameters.length - 1];
        var implementation = callbackName + '(null, \'pending\');';
        var methodParams = parameters.join(paramBoundary);
      }
      else {
        parameters.pop();
        var implementation = 'return \'pending\';';
      }

      var snippet =
`@${functionName.toLowerCase()}(/^${pattern}$/)
public ${methodName}(${methodParams}): void {
  // ${comment}
  ${implementation}
}`;
      return snippet;
    }
  };
}

module.exports = TsFlowSyntax;