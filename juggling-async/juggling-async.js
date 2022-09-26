var http = require('http');
var bl = require('bl');

var urls = process.argv.slice(2)
var count = urls.length;

var results = [];

urls.forEach((url, index) => {
    http.get(url, (res) => {
        res.pipe(bl((err, data) => {
            if (err) throw err;

            results[index] = data.toString();
            count--;

            if (count == 0) {
                results.forEach((result) => {
                    console.log(result)
                });
            }
        }))
    })
})