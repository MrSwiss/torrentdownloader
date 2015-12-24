//var WebTorrent = require('webtorrent');
var mime = require('mime');
var pump = require('pump');

exports.getDownloadLinks = function (req, res) {
	var i = req.params.index;
	var magnetUri = decodeURIComponent(req.params.magnet);
	var split = magnetUri.split('|');
	magnetUri = split[0];
	var timeStamp = split[1];
	var timestamp = parseInt(timeStamp);
	var currTime = new Date().getTime();
	//res.send(magnetUri+"  and index "+i);
	console.log('Entered index file');
	console.log('Got the magnetUri ' + magnetUri + ' and timestamp ' + timeStamp);
	if ((currTime - timestamp) > 60000)
		res.send(404, 'Your connection expired. Please try again');
	else {
		//var torrent = client.get(magnetUri);
		var client = new WebTorrent();
		client.add(magnetUri, function (torrent) {
			//torrent.on('ready',function(){
			console.log('Entered a ready torrent with infoHash=>' + torrent.infoHash);
			var file = torrent.files[i]; //get the file
			res.status(206);
			// no support for multi-range reqs
			//res.setHeader('Content-Range','bytes ' + range.start + '-' + range.end + '/' + file.length);
			console.log('Got file ' + file.name + ' of length ' + file.length);
			res.setHeader('Content-Length', file.length);
			res.setHeader('Accept-Ranges', 'bytes')
			res.setHeader('Content-Type', mime.lookup(file.name))
			res.setHeader('Content-disposition', 'attachment; filename=' + file.name);
			res.setHeader('Keep-Alive', ['timeout=120', 'max=10']); 
			//write content to browser stream
			pump(file.createReadStream(), res, function (err) {
				client.destroy(function (err) {
					if (err) console.log("Errored out while destroying client");
					console.log("Destroyed client after downloading");
				});
			});
		});
		//}); //added wait for torrent ready
	}
}; // end  if check for timestamp