var fs = require('fs');
var request = require('request');
$ = require('cheerio');


request('http://substack.net/images/', function (error, response, body) {
  var writeStream = fs.createWriteStream("./images.csv");
  writeStream.once('open', function(fd){
    if (!error) {
      var lines = body.split('</tr>');
      for(var i = 0; i < lines.length; i++){
        var line = lines[i];
        var file_permission = $(line).find('td').children().html();
        var absolute_url = $(line).find('a').attr('href');
        var file_type = absolute_url.slice( -3 );
        writeStream.write(absolute_url + "," + file_permission + "," + file_type + '\n');
      }
    } 
    writeStream.end();
  });
});
