var Hasshu = require('hasshu');


/*
 * Regex for email headers.
 */
module.exports = new Hasshu({
  'final-recipient': /(.+);\s*(.*)/i,
  'remote-mta': /(.+);\s*(.*)/i,
  'reporting-mta': /(.+);\s*(.*)/i,
  'action': /(failed|delayed|delivered|relayed|expanded)/i, 
  'content-description': /(undelivered message|delivery report)/i,
  'diagnostic-code': /\s*([\d]{3})\s*(\#?[\d.]+)(.*)/i,
  'status': /((\d{1}).(\d+).(\d+))/i
});
