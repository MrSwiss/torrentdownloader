
var http = require('http');
var express = require('express');
var WebTorrent = require('webtorrent');

exports.getTorrentList = function(req,res){
        console.log('Posted to torrent');
        if(!req.body)
        return res.sendStatus(400);    
        res.status(200);
        res.type('text/html');
        var magnetUri=req.body.textfield;
        //res.send("Woohoo! Got the Magnet URI "+magnetUri);
        console.log('Got the magnet Uri=>'+magnetUri);
	var endIndex = magnetUri.indexOf('&');
	if(endIndex>0){
	magnetUri = magnetUri.substring(0,endIndex);
	console.log('Changed the magnetUri to => '+magnetUri);}
        var client = new WebTorrent();
	client.add(magnetUri,function(torrent){	
	//console.log("Torrent Files "+JSON.stringify(torrent.files));
        //replace magnet link string
	console.log("Added torrent to client with magnet URI=>"+magnetUri);
	var encodedUrl = encodeURIComponent(magnetUri);
	var timestamp = new Date().getTime();
	//use new clients at every turn
	var listHtml = torrent.files.map(function (file, i) {
        //console.log('Got the file at index '+i);
          return '<li><a href="/torrent/' + encodedUrl+'|'+timestamp+'/'+i + '">' + file.name + '</a></li>'
        }).join('<br>');
        client.destroy(function(err){
        console.log("Destroyed client after making list");    
	res.send('<h1>Download Torrent</h1><ol>' + listHtml + '</ol>');
		
        });        
	}); //close client add	
	
};