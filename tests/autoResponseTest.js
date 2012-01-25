var fs = require('fs'),
  assert = require('assert'),
  vows = require('vows'),
  Hasshu = require('hasshu'),
  Baunsu = require('../lib/baunsu');


var emailDir = './emails/',
  autoEmails = [];


/*
 * Loads all test bounce emails.
 */
fs.readdirSync(emailDir).forEach(function(file) {
  if (/^auto/i.test(file))
    autoEmails.push(file);
});


/*
 * Queue up tests for auto emails.
 */
autoEmails.forEach(function(file) {

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
    'Is probably not a bounce': function(result) {
      assert.isFalse(result.bounced);
    },
    'Should not be a hard bounce': function(result) {
      assert.isFalse(result.isHard());
    },
    'Should not be soft bounce': function(result) {
      assert.isFalse(result.isSoft());
    },
    'Should have a score': function(result) {
      assert.isNumber(result.score);
    }
  };

});
