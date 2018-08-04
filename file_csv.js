
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  ,fs = require('fs')
  ,mime = require('mime');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jshtml');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



var csv = require('csv-stream');
var request = require('request');

//var options = {
//    delimiter : '\t', // default is ,
//    endLine : '\n', // default is \n,
//    columns : ['columnName1', 'columnName2'] ,// by default read the first line and use values found as columns 
//    escapeChar : '"', // default is an empty string
//    enclosedChar : '"' // default is an empty string
//};
//
//var csvStream = csv.createStream(options);
//request('http://mycsv.com/file.csv').pipe(csvStream)
//    .on('error',function(err){
//        console.error(err);
//    })
//    .on('data',function(data){
//        // outputs an object containing a set of key/value pair representing a line found in the csv file.
//        console.log(data);
//    })
//    .on('column',function(key,value){
//        // outputs the column name associated with the value found
//        console.log('#' + key + ' = ' + value);
//    });


app.get('/download', function(req, res){
	
	var file = __dirname +'/public/countrylist.csv';

	var filename = path.basename(file);
	var mimetype = mime.lookup(file);

	res.setHeader('Content-disposition', 'attachment; filename=' + filename);
	res.setHeader('Content-type', mimetype);
	res.sendfile('views/csv.html');
	//res.download(file);

	var filestream = fs.createReadStream(file);
	filestream.pipe(res);
});
    
    
    
    

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
