var fs = require('fs'),
  assert = require('assert'),
  Hasshu = require('hasshu'),
  Baunsu = require('../lib/baunsu');


var emailDir = __dirname + '/emails/',
  emails = [];


/*
 * Loads all test bounce emails.
 */
fs.readdirSync(emailDir).forEach(function(file) {
  if (/^ordinary/i.test(file))
    emails.push(file);
});



/*
 * Queue up tests for bounced emails.
 */
emails.forEach(function(file) {

  exports['Email from ' + file] = {
    topic: function() {
      var email = fs.readFileSync(emailDir + file),
        bounce = new Baunsu(),
        self = this;

      bounce.on('end', function(err, result){
        self.callback(err, result);
      });

      bounce.detect(email);
    },
    'Has bounced': function(result) {
      assert.isFalse(result.bounced);
    },
    'Should be hard bounce': function(result) {
      assert.isFalse(result.isHard());
    },
    'Should not be soft bounce': function(result) {
      assert.isFalse(result.isSoft());
    },
    'Should have detected bounce headers': function(result) {
      assert.instanceOf(result.matches, Hasshu);
      assert(result.matches.length() > 0);
    },
    'Should have a score': function(result) {
      assert.isNumber(result.score);
    },
    'Should have a score below threshold': function(result) {
      assert(result.score < result.threshold);
    }
  };

});
