var fs = require('fs'),
  assert = require('assert'),
  vows = require('vows'),
  Hasshu = require('hasshu'),
  Baunsu = require('../lib/baunsu'),
  BaunsuHeaders = require('../lib/baunsuHeaders');

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
 * Loads bounce email for topic.
 */
var loadEmail = function(file) {
  return fs.readFileSync(emailDir + file);
};


/*
 * Queue up tests for baunsu object.
 */
var file = bouncedEmails[0],
  testName = 'Email from ' + file;


/*
 * Test baunsu line processing.
 */
exports[testName + ':line'] = {

  topic: function() {
    var email = loadEmail(file),
      bounce = new Baunsu(),
      lines = [];

    var self = this;
    bounce.on('line', function(line) {
      lines.push(line);
    }).on('end', function(err, result) {
      self.callback(err, lines);
    });

    bounce.detect(email);
  },
  'Should have lines': function(lines) {
    assert.notEqual(lines.length, 0);
  }
};


/*
 * Test baunsu header matching.
 */
exports[testName + ':match'] = {
  topic: function() {
    var email = loadEmail(file),
      bounce = new Baunsu(),
      matches = [];

    var self = this;
    bounce.on('match', function(match) {
      matches.push(match);
    }).on('end', function(err, result) {
      self.callback(err, matches);
    });

    bounce.detect(email);
  },
  'Should have matches': function(matches) {
    assert.notEqual(matches.length, 0);
  },
  'Matches should have properties header and match': function(matches) {
    var match = matches[0];
    assert.isObject(match);
    assert.isString(match.header);
    assert.isString(match.match);
  }
};


/*
 * Test baunsu detect.
 */
exports[testName + ':detect'] = {
  topic: function() {
    var email = loadEmail(file),
      bounce = new Baunsu(),
      matches = [];

    var self = this;
    bounce.on('detect', function(match) {
      matches.push(match);
    }).on('end', function(err, result) {
      self.callback(err, matches);
    });

    bounce.detect(email);
  },
  'Should have matches': function(matches) {
    assert.notEqual(matches.length, 0);
  },
  'Matches should have property header and matches': function(matches) {
    var match = matches[0];
    assert.isObject(match);
    assert.isString(match.header);
    assert.isArray(match.matches);
  }
};


/*
 * Test baunsu headers.
 */
exports['Baunsu Headers'] = {
  topic: BaunsuHeaders,
  'Should have keys': function(headers) {
    assert.isTrue(headers.length() > 0);
  },
  'Should have regex values': function(headers) {
    var vals = headers.values();
    assert.isArray(vals);
    assert.isTrue(vals.length > 0);

    vals.forEach(function(val) {
      assert.instanceOf(val, RegExp);
    });
  }
};
