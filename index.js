const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();
const path = require('path');

const PORT = 3000;
app.use('/form', express.static(__dirname + '/index.html'));
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));
// default options
app.use(fileUpload({
	  limits: { fileSize: 50 * 1024 * 1024 },
}));

app.get('/ping', function(req, res) {
  res.send('pong');
});

app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line

  sampleFile = req.files.sampleFile;
  var suffix = '/uploads/' + "_" +Date.now() +"_" +sampleFile.name ;
  uploadPath = __dirname + suffix;

  sampleFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.send( {path:suffix});
  });
});

app.listen(PORT, function() {
  console.log('Express server listening on port ', PORT); // eslint-disable-line
});