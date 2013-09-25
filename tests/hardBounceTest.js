var fs = require('fs'),
  assert = require('assert'),
  vows = require('vows'),
  Hasshu = require('hasshu'),
  Baunsu = require('../lib/baunsu');


var emailDir = __dirname + '/emails/',
  bouncedEmails = [];


/*
 * Loads all test bounce emails.
 */
fs.readdirSync(emailDir).forEach(function(file) {
  if (/^bounce/i.test(file))
    bouncedEmails.push(file);
});



/*
 * Queue up tests for bounced emails.
 */
bouncedEmails.forEach(function(file) {

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
      assert.isTrue(result.bounced);
    },
    'Should be hard bounce': function(result) {
      assert.isTrue(result.isHard());
    },
    'Should not be soft bounce': function(result) {
      assert.isFalse(result.isSoft());
    },
    'Should have detected bounce headers': function(result) {
      assert.instanceOf(result.matches, Hasshu);
      assert.isTrue(result.matches.length() > 0);
    },
    'Should have a score': function(result) {
      assert.isNumber(result.score);
    }
  };

});
