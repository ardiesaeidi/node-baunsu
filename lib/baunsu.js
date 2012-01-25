var util = require('util'),
  EventEmitter = require('events').EventEmitter,
  Hasshu = require('hasshu'),
  BaunsuHeaders = require('./baunsuHeaders'),
  BaunsuResult = require('./baunsuResult');


module.exports = Baunsu;


/*
 * Baunsu (bounce in japanese) is a email bounce detection library.
 */
function Baunsu() {
  if (!(this instanceof Baunsu))
    return new Baunsu();

  Object.defineProperty(this, 'bounceMax', {
    value: BaunsuHeaders.length() * 2.0,
    writable: false,
    enumerable: true
  });

  // setup eventemitter inheritance
  EventEmitter.call(this);
};


/*
 * Inherit from EventEmitter
 */
util.inherits(Baunsu, EventEmitter);


/*
 * Detects bounce signatures in email.
 * @param msg: Email message as Buffer or string.
 */
Baunsu.prototype.detect = function(msg) {
  var self = this;
  var timeout = setTimeout(function() {
    clearTimeout(timeout);

    try {
      var result = self.detectSync(msg);
      self.emit('end', undefined, result);
    } catch(ex) {
      self.emit('end', ex);
    }

  }, 0);
};


/*
 * Detects bounce signatures in email.
 * @param msg: Email message as Buffer or string.
 */
Baunsu.prototype.detectSync = function(msg) {
  if (Buffer.isBuffer(msg)) {
    msg = msg.toString('ascii');
  } else if (typeof(msg) !== 'string' || !Buffer.isBuffer(msg)) {
    throw new TypeError('msg must be a string or Buffer');
  }

  return detectBounce.call(this, msg);
};


/*
 * Walks the email message line by line.
 * @param msg: Email message as string. 
 */
function walk(msg) {
  var lines = [];

  // unfold lines in the email msg
  msg.split(/\r?\n|\r/).forEach(function(line) {
    var lastPos = lines.length - 1;

    if(line.match(/^\s|\t+/) && lastPos >= 0){
      lines[lastPos] += ' ' + line.trim();
    } else {
      lines.push(line.trim());
    }
  });

  return lines;
}


/*
 * Matches potential bounce headers.
 * @param msg: Email message as string.
 */
function matchBounceHeaders(msg) {

  var self = this,
    headerReg = new RegExp('^(' + BaunsuHeaders.keys().join('|') + '):(.*)', 'i'),
    matches = new Hasshu();

  walk.call(this, msg).forEach(function(line) {

    self.emit('line', line);

    // check if line begins with header property defined in BaunsuHeaders
    var lineParts = headerReg.exec(line);

    if (lineParts === null)
      return;

    var header = lineParts[1].toLowerCase();

    if (!matches.hasKey(header))
      matches.set(header, []);

    var val = lineParts[2];

    self.emit('match', { header: header, match: val });
    matches.get(header).push(val);
  });

  return matches;
}


/*
 * Detects if email message contains bounce signatures.
 * @param msg: Email message as string.
 */
function detectBounce(msg) {

  var self = this,
    score = 0,
    matches = new Hasshu();

  matchBounceHeaders.call(this, msg).forEach(function(header, headerVal) {

    // increment score if header was found
    score += 1;

    var matched = [],
      bounceReg = BaunsuHeaders.get(header);

    // check header value for possible bounce signatures 
    headerVal.forEach(function(val) {
      var match = bounceReg.exec(val);
      if (match !== null)
        matched.push(match);
    });

    if (matched.length === 0)
      return;

    // update the score based on matches
    score += matched.length / headerVal.length;
      
    self.emit('detect', { header: header, matches: matched } );
    matches.set(header, matched);
  });

  return new BaunsuResult(matches, score / this.bounceMax);
}
