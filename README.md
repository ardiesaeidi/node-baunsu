# Baunsu
Baunsu (bounce in japanese) is an email bounce detection library inspired by [Lamson Project's bounce detection algorithm](https://github.com/zedshaw/lamson/blob/master/doc/lamsonproject.org/input/blog/2009-07-09.txt "Lamson Project's bounce detection algorithm").


## Usage
```javascript
var fs = require('fs'),
  Baunsu = require('baunsu');

fs.readFile('./bouncedEmail.txt', function(err, data) {
  var bounce = new Baunsu();

  bounce.on('end', function(err, baunsuResult) {
    if (err)
      throw err;

    console.log(baunsuResult.bounced);
  });

  bounce.detect(data);
});
```

**Note**:

The bouncedEmail.txt must contains a 'bounced error mail'. You can find examples in the **tests/emails** directory

These mails are returned by a mailserver when it can't deliver the message.

You can use this module by hooking it to your mailserver whenever a bounced mail is received, and do something for it (such as flagging the email address, preventing further bounces)


## Installation
    npm install baunsu



## Baunsu API

### Methods:

#### detect(msg: Buffer or string)
Detects bounce signatures in email asynchronously.

#### detectSync(msg: Buffer or string)
Detects bounce signatures in email and returns a BaunsuResult object.


### Events:

#### 'line': function(line) {}
Emits every line being walked by baunsu.

#### 'match': function(match) {}
Emitted every time a bounce header is matched.
    { header: string, match: string }

#### 'detect': function(detect) {}
Emiited every time bounce signature is detected.
    { header: string, matches: array }

#### 'end': function(baunsuResult) {}
Emitted at the end of bounce detection.


## Baunsu Result

### Properties:

#### matches
Returns a hash of matched email headers and regex values. (Hasshu instance)

#### score
Calculated score determining bounce probabilty.

#### bounced
Returns true/false if email is considered bounce. (Can be adjusted by threshold)

#### threshold
Sets bounce score threshold. Default is 0.3.

#### status

Returns object containing enhanced status code, class, subject and detail.

```javascript
{
  code: string,
  class: { code: number, message: '' },
  subject: { code: number, message: '' },
  detail: { code: number, message: '' }
}
```

#### remoteMta
Returns array if remote mta headers were found.

#### reportingMta
Returns array if reporting mta headers were found.

#### diagnosticCodes
Returns array if diagnostic codes were found.

#### action
Returns action value if header was found.

### Methods:

####isHard()
Returns true if email is considered a hard bounce.

####isSoft()
Returns true if email is considered a soft bounce.


# License
(The MIT License)

Copyright (c) 2012 Ardie Saeidi

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
