var BaunsuHeaders = require('./baunsuHeaders'),
  StatusCodes = require('./statusCodes');


module.exports = BaunsuResult;


/*
 * Results of Baunsu detection.
 * @param matches: Hash of detected bounce headers. (Hasshu instance)
 * @param score: Calculated score from bounce detection.
 */
function BaunsuResult(matches, score) {
  if (!(this instanceof BaunsuResult))
    return new BaunsuResult(matches, score);


  // properties
  this.threshold = 0.3;

  Object.defineProperty(this, 'matches', {
    value: matches,
    writable: false,
    enumerable: true
  });

  Object.defineProperty(this, 'score', {
    value: score,
    writable: false,
    enumerable: true
  });

  Object.defineProperty(this, 'bounced', {
    value: this.score > this.threshold,
    writable: false,
    enumerable: true
  });

  this.status = {
    code: undefined,
    class: undefined,
    subject: undefined,
    detail: undefined
  };
 
  this.remoteMta;
  this.reportingMta;
  this.diagnosticCodes;
  this.action;
  this.type;

  init.call(this);
}


BaunsuResult.prototype = {
  /*
   * Returns true if email is hard bounce.
   */
  isHard: function() {
    return this.bounced && this.status.class.code > 4;
  },


  /*
   * Returns true if email is a soft bounce.
   */
  isSoft: function() {
    return this.bounced && this.status.class.code < 5;
  }
};


/*
 * Initialize BaunsuResult with detection results.
 */
function init() {

  var self = this;

  this.matches.forEach(function(key, val) {
    switch(key) {
      case 'status':
        var status = val[0];

        self.status.code = status[1];
        self.status.class = { code: parseInt(status[2]), message: StatusCodes.Class.get(status[2]) };
        self.status.subject = { code: parseInt(status[3]), message: StatusCodes.Subject.get(status[3]) };

        var detail = status.slice(3,5).join('');
        self.status.detail = { code: parseInt(detail), message: StatusCodes.Detail.get(detail) };

        self.type = self.status.class.code > 4 ? 'hard' : 'soft'; 
        break;

      case 'remote-mta':
        self.remoteMta = val[0][2];
        break;

      case 'reporting-mta':
        self.reportingMta = val[0][2];
        break;

      case 'final-recipient':
        self.finalRecipient = val[0][2];
        break;

      case 'diagnostic-code':
        self.diagnosticCodes = val[0].slice(1,4);
        break;
    }
  });  
};
