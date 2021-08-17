const http = require('http');
const formidable = require('formidable');
const fs = require('fs');
 
//S? d?ng module fs d? d?c n?i dung file viewUploadForm
const viewFormUpload = fs.readFileSync('./viewUploadForm.html')
 
//Kh?i t?o server
http.createServer(function (req, res) {
  //B?t yêu c?u resquest g?i d?n url /upload có method là POST
  if (req.url == '/upload' && req.method == 'POST') {
    //Kh?i t?o d?i tu?ng formidable
    const option = {
       
    }
    const form = new formidable.IncomingForm();
    //Ti?n hành parse form
    form.parse(req, function (err, fields, files) {
      //L?y du?ng d?n t?m th?i c?a  file khi upload
      let oldPath = files.files.path
      //Ðu?ng d?n m?i khi upload 
      let newPath = __dirname + '/uploads/' + files.files.name
      //Ti?n hành rename file t?m th?i thành du?ng d?n file m?i
      fs.rename(oldPath, newPath, (err) => {
         //Tr? ra lõi n?u g?p
         if (err) return res.end(err)
 
         //Tr? v? k?t qu? thành công
         return res.end('<h1 style="color: green;">Upload success !</h1>')
      })
    })
  } else {
    //Hi?n th? ra form upload file
    res.writeHead(200, {'Content-Type': 'text/html'});
    return res.end(viewFormUpload);
  }
}).listen(6969); //S? d?ng port 6969
