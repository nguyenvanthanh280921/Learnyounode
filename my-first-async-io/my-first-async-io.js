// var fs = require('fs')
// var myNumber = undefined

// function addOne(callback) {
//   fs.readFile('number.txt', function doneReading(err, fileContents) {
//     myNumber = parseInt(fileContents)
//     myNumber++
//     callback()
//   }) 
// }

// function logMyNumber() {
//   console.log(myNumber)
// }

// addOne(logMyNumber)
/////////////////////////////////////////////

var fs = require('fs');

fs.readFile(process.argv[2],'utf8',function(err, data) {
var cnt = data.split('\n').length - 1;
console.log(cnt);
});

/////////////////////////////////////////////

// const fs = require('fs')
// const file = process.argv[2]

// fs.readFile(file, function (err, contents) {
//   if (err) {
//     return console.log(err)
//   }
//   // fs.readFile(file, 'utf8', callback) can also be used
//   const lines = contents.toString().split('\n').length - 1
//   console.log(lines)
// })

