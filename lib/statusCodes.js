var Hasshu = require('hasshu');

/*
 * Email status codes.
 * http://www.faqs.org/rfcs/rfc1893.html
 * http://www.faqs.org/rfcs/rfc3464.html
 */
exports.Class = new Hasshu({
  '1': 'Unknown Status Code 1',
  '2': 'Success',
  '3': 'Temporary Failure',
  '4': 'Persistent Transient Failure',
  '5': 'Permanent Failure'
});


exports.Subject = new Hasshu({
  '0': 'Other or undefined status',
  '1': 'Addressing status',
  '2': 'Mailbox status',
  '3': 'Mail system status',
  '4': 'Network and routing status',
  '5': 'Mail delivery protocol status',
  '6': 'Message content or media status',
  '7': 'Security or policy status',
});


exports.Detail = new Hasshu({
  '00': 'Not applicable',
  '10': 'Other address status',
  '11': 'Bad destination mailbox address',
  '12': 'Bad destination system address',
  '13': 'Bad destination mailbox address syntax',
  '14': 'Destination mailbox address ambiguous',
  '15': 'Destination mailbox address valid',
  '16': 'Mailbox has moved',
  '17': 'Bad sender\'s mailbox address syntax',
  '18': 'Bad sender\'s system address',
  '20': 'Other or undefined mailbox status',
  '21': 'Mailbox disabled, not accepting messages',
  '22': 'Mailbox full',
  '23': 'Message length exceeds administrative limit.',
  '24': 'Mailing list expansion problem',
  '30': 'Other or undefined mail system status',
  '31': 'Mail system full',
  '32': 'System not accepting network messages',
  '33': 'System not capable of selected features',
  '34': 'Message too big for system',
  '40': 'Other or undefined network or routing status',
  '41': 'No answer from host',
  '42': 'Bad connection',
  '43': 'Routing server failure',
  '44': 'Unable to route',
  '45': 'Network congestion',
  '46': 'Routing loop detected',
  '47': 'Delivery time expired',
  '50': 'Other or undefined protocol status',
  '51': 'Invalid command',
  '52': 'Syntax error',
  '53': 'Too many recipients',
  '54': 'Invalid command arguments',
  '55': 'Wrong protocol version',
  '60': 'Other or undefined media error',
  '61': 'Media not supported',
  '62': 'Conversion required and prohibited',
  '63': 'Conversion required but not supported',
  '64': 'Conversion with loss performed',
  '65': 'Conversion failed',
  '70': 'Other or undefined security status',
  '71': 'Delivery not authorized, message refused',
  '72': 'Mailing list expansion prohibited',
  '73': 'Security conversion required but not possible',
  '74': 'Security features not supported',
  '75': 'Cryptographic failure',
  '76': 'Cryptographic algorithm not supported',
  '77': 'Message integrity failure',
});;
