var http = require('http');
var fs = require('fs');
var parguments = process.argv;
var path = process.argv[3];
var path2 = parguments[3];

var server = http.createServer(
    function (req, res)
    {

    console.log('path1'+path);
    console.log('path2'+path2);
    console.log('path3'+parguments[3]);
        var fileStream = fs.createReadStream(parguments[3]);
        fileStream.pipe(res);
    }
);

server.listen(parguments[2]);
