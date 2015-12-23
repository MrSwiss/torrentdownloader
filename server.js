var http = require('http');
var express = require('express');
var fs = require('fs');

var app = express();
var path = __dirname+'/views/'; //using the global variable __dirname
var bodyParser = require('body-parser');

var torrentController = require('./controllers/torrents.js');
var dloadController = require('./controllers/download.js');
var server_port = process.env.OPENSHIFT_NODEJS_PORT || process.env.port || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'; 

app.use(bodyParser.urlencoded());

app.get('/',function(req,res){
	res.type('text/html');
	res.status(200);
	res.send('Welcome explorer! You\'re probably looking for the <a href="/download">Downloads</a> section');	
});
app.get('/download',function(req,res){
	res.status('200');
	//console.log(client.torrents.length + " torrents available in client.");
	var d = new Date();
	var ip = req.headers['x-forwarded-for'] || 
	     req.connection.remoteAddress || 
	     req.socket.remoteAddress ||
	     req.connection.socket.remoteAddress;
	console.log('User entered from IP: '+ip);
	fs.appendFile(__dirname+'/log.txt','User logged in at '+d.toString() +' from IP '+ip+'\n',function(err){if(err) console.log('Error while writing log');});
	res.sendFile(path+"download.html"); //magnet url and form submit
});

//TODO heavy lifting in this method
app.post('/torrent',torrentController.getTorrentList);
//TODO download torrent streams in this method
app.get('/torrent/:magnet/:index',dloadController.getDownloadLinks);
app.listen(server_port,server_ip_address,function(){ console.log("Listening on "+server_port); });

