var common = [
  'tests/acceptance/features/**/*.feature',
  '--tags "not @ignore"',
  '--tags "not @interesse"',
  '--format=node_modules/cucumber-pretty',
  '--format-options \'{"snippetSyntax": "tests/acceptance/syntax.js"}\'',
  '--require-module=ts-node/register',
  '--require=tests/acceptance/global.ts',
  '--require=tests/acceptance/steps/**/*.ts',
  '--fail-fast'
].join(' ');

module.exports = {
  'default': common
};
