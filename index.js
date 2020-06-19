var app = require('express')();
var bodyParser = require('body-parser')
var express = require('express');

var fs = require('fs'),
    path = require('path'),
    Handlebars = require('handlebars');
var nodemailer = require('nodemailer');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json())
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(function(req,res,next){
        res.setHeader('Access-Control-Allow-Origin', "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With, Origin, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT");
        res.header("Access-Control-Allow-Credentials", true);
        res.header("X-Frame-Options", "DENY");
        res.header("accept-encoding", "gzip,deflate");
        res.header("Content-Security-Policy", "frame-ancestors 'none'");
        res.header("X-XSS-Protection", "1; mode=block");
        next();
 });
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Fiber = require('fibers');
var database = require("./database.js");
var bodyParser = require('body-parser')
var md5 = require('md5');

var Chatroom = require('./database.js').Chatroom;
var UserInfo = require('./database.js').UserInfo;
var ChatroomLogs = require('./database.js').ChatroomLogs;
var BlockedUsers = require('./database.js').BlockedUsers;
const PORT = 8080;
app.get('/', function(req, res) {
  return res.status(200).send({"message":"Empty","status":200});  
});


app.post("/upload_image_in_base64",function(req, res) {
 var base64str = req.body.target_image;

 var buf = Buffer.from(base64str,'base64');
 var fileName ="file_" + new Date().getTime();
 fs.writeFile(path.join(__dirname,'/public/',fileName), buf, function(error){
      if(error){
          console.log(error);
          throw error;
       }else{
           return res.status(200).send({"message":"Image Uploaded Successfully","result":"https://messages.ce5contact.com/" + "public/" + fileName,"status":200});  
       }
      }); 
});

// Start server
try {
    http.listen(process.env.PORT || PORT);
} catch (e) {
    console.error(e);
}
