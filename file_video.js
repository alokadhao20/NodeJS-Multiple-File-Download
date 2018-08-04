/**
 * New node file
 */
var express = require('express'),
fs = require('fs'),
path = require('path'),
http = require('http'),
mime = require('mime');

var app = express();

app.set('port', process.env.PORT || 3000);

if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}
app.get('/download/video', function(req, res){
	var file = __dirname +'/public/video.mov';
	var filename = path.basename(file);
	var mimetype = mime.lookup(file);

	res.sendfile('views/video.html');
	res.setHeader('Content-disposition', 'attachment; filename=' + file);
	res.setHeader('Content-type', mimetype);
	var filestream = fs.createReadStream(file);
	filestream.pipe(res);
});


http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});