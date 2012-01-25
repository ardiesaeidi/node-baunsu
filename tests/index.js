var fs = require('fs'),
  vows = require('vows');

/*
 * Loads all test emails.
 */
var allTests = vows.describe('All tests').export(module);

fs.readdirSync(__dirname).forEach(function(file) {
  if (/index.js|emails/i.test(file))
   return;

  allTests.addBatch(require('./' + file));
});

