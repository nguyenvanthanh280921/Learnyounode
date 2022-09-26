// const fs = require('fs');

// const buf = fs.readFileSync(process.argv[2]);
// const str = buf.toString().split('\n').length -1;

// console.log(str);
//////////////////////////////////////////////

// const fs = require('fs');
// const filename = process.argv[2];
// file = fs.readFileSync(filename);
// contents = file.toString();
// console.log(contents.split('\n').length -1);

////////////////////////////////////////////////
// console.log (request ('fs'). readFileSync (process.argv [2]). toString (). split ('\ n'). length - 1)


// const fs = require('fs');
// const buff = fs.readFileSync(process.argv[2]);
// const aaa = buff.toString().split('\n').length -1;

// console.log(aaa);

const fs = require('fs');

const buff = fs.readFileSync(process.argv[2],'utf8').split('\n').length - 1;
console.log(buff);