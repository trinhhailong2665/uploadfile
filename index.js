const http = require('http');
const formidable = require('formidable');
const fs = require('fs');
 
//S? d?ng module fs d? d?c n?i dung file viewUploadForm
const viewFormUpload = fs.readFileSync('./viewUploadForm.html')
 
//Kh?i t?o server
http.createServer(function (req, res) {
  //B?t y�u c?u resquest g?i d?n url /upload c� method l� POST
  if (req.url == '/upload' && req.method == 'POST') {
    //Kh?i t?o d?i tu?ng formidable
    const option = {
       
    }
    const form = new formidable.IncomingForm();
    //Ti?n h�nh parse form
    form.parse(req, function (err, fields, files) {
      //L?y du?ng d?n t?m th?i c?a  file khi upload
      let oldPath = files.files.path
      //�u?ng d?n m?i khi upload 
      let newPath = __dirname + '/uploads/' + files.files.name
      //Ti?n h�nh rename file t?m th?i th�nh du?ng d?n file m?i
      fs.rename(oldPath, newPath, (err) => {
         //Tr? ra l�i n?u g?p
         if (err) return res.end(err)
 
         //Tr? v? k?t qu? th�nh c�ng
         return res.end('<h1 style="color: green;">Upload success !</h1>')
      })
    })
  } else {
    //Hi?n th? ra form upload file
    res.writeHead(200, {'Content-Type': 'text/html'});
    return res.end(viewFormUpload);
  }
}).listen(6969); //S? d?ng port 6969
