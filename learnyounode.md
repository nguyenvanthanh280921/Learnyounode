# Learningnyoumode
https://github.com/workshopper/learnyounode

## Hello world

- Viết chương trình "Hello World" ra giao diện dòng lệnh (stdout)
```js
console.log("HELLO WORLD");
```

## Baby steps

- Viết một chương trình nhập một hoặc nhiều số đầu vào qua tham số dòng lệnh và in tổng của chúng ra giao diện dòng lệnh (stdout).

- Bạn có thể truy cập tham số dòng lệnh qua đối tượng toàn cục `process`. Đối tượng `process` có một thuộc tính là `argv`. Thuộc tính này là một mảng chứa đầy đủ thông số dòng lệnh.

```js
let result = 0;

for (let i = 2; i < process.argv.length; i++) {
  result += Number(process.argv[i]);
}

console.log(result);

// console.log(process.argv);
```

## My First I/O

- Ví dụ: Viết chương trình đếm số dòng mới trong một tệp và xuất nó trong dấu nhắc lệnh

    - Chúng ta có thể sử dụng phương thức `readFileSync()` để đọc nội dung của file
    - Có thể sử dụng thuộc tính `argv` của đối tượng `process` để tính tổng các giá trị được truyền dưới dạng đối số
    - Truy cập chỉ mục 2 của `process.argv` để đọc nội dung được truyền dưới dạng đối số thứ ba cho dòng lệnh. Phương thức `readFileSync()` trả về đối tượng đệm khi quá trình đọc hoàn tất
    - Chúng ta có thể chuyển đổi nội dụng của đối tượng đệm đó thành một chuỗi bằng phương thực `toString()`. Từ đó ta sử dụng phương thức `split()` để chia chuỗi tại mỗi dòng mới `('\n')` và lấy độ dài bằng `.length`.

```js
const fs = require('fs');

const buff = fs.readFileSync(process.argv[2]);
const str = buff.toString().split('\n').length -1;

console.log(str);

// Có thể không dùng .toString() bằng cách chuyển thành 'utf8' làm đối số thứ hai cho readFileSync 
// => fs.readFileSync(process.argv[2], 'utf8').split('\n').length -1;
```

## My First Async I/O

- Ví dụ: Viết một chương trình sử dụng một thao tác hệ thống tệp `asynchronous(không đồng bộ)` duy nhất để đọc một tệp và in số dòng mới mà nó chứa vào bảng điều khiển (stdout), tương tự như đang chạy `cat file | wc-l`

    - Chúng ta sẽ sử dụng `fs.readFile()` 

```js
 const fs = require('fs')
    const file = process.argv[2]

    fs.readFile(file, function (err, contents) {
      if (err) {
        return console.log(err)
      }
      // fs.readFile(file, 'utf8', callback) can also be used
      const lines = contents.toString().split('\n').length - 1
      console.log(lines)
    })
```
- quá trình không đồng bộ cho phép tập lệnh tiếp tục chạy
- Hàm `readFile()` là phiên bản không đồng bộ của `readFileSync()`. 
- `readFile()` lấy tên tệp làm tham số đầu tiên và hàm gọi lại làm tham số cuối cùng .
- Hàm gọi lại nhận 2 tham số , trình xử lý lỗi `err` và tham số dữ liệu là nội dung file của bạn.

## Filtered LS

- Tạo một chương trình in danh sách các tệp trong một thư mục nhất định, được lọc theo phần mở rộng của tệp. Bạn sẽ được cung cấp tên thư mục làm đối số đầu tiên cho chương trình của mình (ví dụ: '/ path / to / dir /') và một phần mở rộng tệp để lọc làm đối số thứ hai.
- Danh sách các file lọc được sẽ được in ra giao diện dòng lệnh với mỗi file nằm trên một dòng. 
- Phương thức `fs.readdir()` này nhận một tên đường dẫn làm đối số đầu tiên và một cuộc gọi lại làm đối số thứ hai của nó.

```js
const fs = require('fs');
const path = require('path');

const folder = process.argv[2];
const ext = '.' + process.argv[3];

fs.readdir(folder,function(err, files){
    if(err) return console.error(err);
    files.forEach(function(file){
        if(path.extname(file) === ext){
            console.log(file)
        }
    });
});
```
## Make It Modular

- Tạo 2 file. Tạo một chương trình in ra một danh sách các file được lọc với đuôi mở rộng từ một thư mục được chỉ định. Tham số đầu tiên sẽ là tên thư mục, còn tham số thứ 2 sẽ là đuôi mở rộng. Sau đó in ra mỗi file trên một dòng ở giao diện dòng lệnh (stdout). Cần phải sử dụng I/O bất đồng bộ ở đây.

```js
// make-it-modular.js

var path = require('path');
var mymodule = require('./mymodule');
var dir = process.argv[2];
var filterExtension = process.argv[3];

var callback = function (err, list) {
    if (err) throw err;
    list.forEach(function (file) {
        console.log(file);
    });
}

mymodule(dir, filterExtension, callback);
```

```js
// mymodule.js

var fs = require('fs');
var path = require('path');

module.exports = function (directory, extension, callback) {
    fs.readdir(directory, function (err, list) {
        if (err){
            return callback(err);
        }else {
            list = list.filter(function (file) {
                if(path.extname(file) === '.' + extension) return true;
            })
            return callback(null, list);
        }
    })
}

```


## HTTP Client

- Viết một chương trình nhận một URL qua tham số đầu tiên và lấy nội dung của URL đó thông qua HTTP GET request. Sau đó hãy in từng dữ liệu ở mỗi sự kiện của response ra một dòng mới ở giao diện dòng lệnh (stdout).

```js
'use strict'
    const http = require('http');

    http.get(process.argv[2], function (response) {
      response.setEncoding('utf8');
      response.on('data', console.log);
      response.on('error', console.error);
    }).on('error', console.error);
```

## HTTP Collect

- Viết một chương trình nhận một URL qua tham số đầu tiên và thực hiện một HTTP GET request. Tập kết tất cả dữ liệu từ mày chủ (không chỉ có sự kiện "data" đầu tiên) và sau đó in ra 2 dòng như sau trên giao diện dòng lệnh (stdout).
    1. Dòng thứ 1: In ra số kí tự nhận được từ máy chủ
    2. Dòng thứ 2: In ra đầy đủ chuỗi nội dung nhận được từ máy chủ
```js
const http = require('http');
const bl = require('bl');

http.get(process.argv[2], function (response) {
  response.pipe(bl(function (err, data) {
    if (err) {
      return console.error(err);
    }
    data = data.toString();
    console.log(data.length);
    console.log(data);
  }));
});
```

## Juggling Async

- Cho 3 URL của tham số đầu tiên. Bạn phải tập kết toàn bộ nội dung đầy đủ của URL đã được cung cấp và in nó ra giao diện dòng lệnh (stdout). Bạn không cần phải in ra độ dài mà chỉ cần in dữ liệu ra dưới dạng String, với mỗi URL trên một dòng tương ứng, Tức là bạn cần phải in chúng ra đúng thứ tự của 3 URL đầu vào.

```js
const http = require('http');
    const bl = require('bl');
    const results = [];
    let count = 0;

    function printResults () {
      for (let i = 0; i < 3; i++) {
        console.log(results[i]);
      }
    }

    function httpGet (index) {
      http.get(process.argv[2 + index], function (response) {
        response.pipe(bl(function (err, data) {
          if (err) {
            return console.error(err);
          }

          results[index] = data.toString();
          count++;

          if (count === 3) {
            printResults();
          }
        }));
      });
    }

    for (let i = 0; i < 3; i++) {
      httpGet(i);
    }
```

## Time Server

- Viết một chương trình Máy chủ thời gian TCP (Transmission Control Protocol) ghi ngày và giờ
- Máy chủ của bạn sẽ lắng nghe kết nối TCP qua một cổng được nhập vào qua tham số đầu tiên. Với mỗi một kết nối tới, bạn sẽ gửi lại một thời gian hiện tại theo mẫu:

> "YYYY-MM-DD hh:mm"

- Với hậu tố là một kí tự xuống dòng. Ngày, tháng, giờ và phút vần thêm 0 để có dạng 2 kí tự. 
ví dụ: "2022-02-02 17:35".

```js
const net = require('net');

    function zeroFill (i) {
      return (i < 10 ? '0' : '') + i
    }

    function now () {
      const d = new Date();
      return d.getFullYear() + '-' +
        zeroFill(d.getMonth() + 1) + '-' +
        zeroFill(d.getDate()) + ' ' +;
        zeroFill(d.getHours()) + ':' +
        zeroFill(d.getMinutes())
    }

    const server = net.createServer(function (socket) {
      socket.end(now() + '\n');
    })

    server.listen(Number(process.argv[2]));
```
## HTTP File Server

- Viết một máy chủ HTTP trả về cùng một file text giống nhau cho mỗi request nó nhận được. Máy chủ của bạn sẽ lắng nghe tại một cổng được chỉ định qua tham số đầu tiên của chương trình. Còn tham số dòng lệnh thứ 2 sẽ cung cấp vị trí của file sẽ được phục vụ cho mỗi request. Bạn cần phải sử dụng phương thức `fs.createReadStream()` để tạo dòng dữ liệu từ file đó và gửi cho reponse nội dung nhận được từ dòng dữ liệu đó.
- Bài này yêu cầu chúng ta sử dụng phương thức `fs.createReadStream ()` để truyền nội dung tệp tới phản hồi của máy chủ thay vì sử dụng phương thức `fs.readFile ()`. Có gì khác biệt? Phương thức `fs.readFile ()` sẽ đọc toàn bộ tệp vào bộ nhớ trước khi gửi nó đến phản hồi, trong khi phương thức `fs.createReadStream ()` sẽ truyền nội dung tệp tới phản hồi khi nó được đọc. Điều này có thể nhanh hơn trong một số trường hợp và sử dụng ít bộ nhớ hơn.
- Bằng cách tạo luồng đọc, chúng ta có thể sử dụng phương thức `pipe ()` để truyền nội dung tệp của mình từ nguồn (the file) đến đích (the response).

```js
const http = require('http');
    const fs = require('fs');

    const server = http.createServer(function (req, res) {
      res.writeHead(200, { 'content-type': 'text/plain' });

      fs.createReadStream(process.argv[3]).pipe(res);
    })

    server.listen(Number(process.argv[2]));
```
## HTTP UpperCaserer

- Tạo một máy chủ HTTP chỉ nhận các request dạng POST và chuyển đổi các kí tự trong phần nội dung (body) nhận được thành dạng chữ viết HOA, sau đó gửi lại chuỗi chữ Hoa đó cho client thông qua phản hồi của server.

```js
const http = require('http');
const map = require('through2-map');

const server = http.createServer(function (req, res) {
  if (req.method !== 'POST') {
    return res.end('send me a POST\n');
  }

  req.pipe(map(function (chunk) {
    return chunk.toString().toUpperCase();
  })).pipe(res);
})

server.listen(Number(process.argv[2]));
```
## HTTP Json Api Server

- Viết một máy chủ trả về dữ liệu JSON khi nhận được một request GET qua đường dẫn '/api/parsetime'. Request này sẽ chưa một chuỗi truy vấn (query string) với một khóa (key) là 'iso', và giá trị là một thông số thời gian ISO (ISO-formate time).

   
