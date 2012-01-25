Baunsu
======

Baunsu (bounce in japanese) is an email bounce detection library based on [Lamson Project's bounce detection algorithm](http://lamsonproject.org/blog/2009-07-09.html "Lamson Project's bounce detection algorithm").

Usage
------

    var fs = require('fs'), 
      Baunsu = require('baunsu');

    fs.readFile('./bouncedEmail.txt', function(err, data) {
      var bounce = new Baunsu();
  
      bounce.on('end', function(err, result) {
        if (err)
          throw err;
  
        console.log(result.bounced);
      });
  
      bounce.detect(data);
    });