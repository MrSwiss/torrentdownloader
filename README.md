# ReadMe 

Torrent downloader is a project utilizing code libraries of [WebTorrent](http://webtorrent.io). In order to run this you simply need to clone this repo
```
git clone <this repo>
```
Followed by an install of npm and node if you havent already. I find this way to be particularly useful for Ubuntu
```
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
```

The latest version of node can be installed using npm

```
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```

And that is all that's required . 
> Now simply a npm install in the directory should get all the dependencies required.

This will bring up an http server required for the torrents. Just paste in your magnet link and it should be ready to go for all files within the torrent.
```
node server.js
```

Brings up the server on the *process port or on 8080*, whichever is available.