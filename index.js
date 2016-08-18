var fs = require('fs');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var log4js = require('log4js');
var async = require('async');

// var urlLog = log.getLogger(1, 'urlLog');
// var bodyLog = log.getLogger(0, 'bodyLog');

var options = {
	url: 'http://jandan.net/ooxx/page-20#comments',
	headers: {
		'User-Agent': ' Mozilla/5.0 (Windows NT 6.1; WOW64; rv:45.0) Gecko/20100101 Firefox/45.0'
	}
};

var download = function(url, cb) {
// var download = function(url, dir, filename) {
	request.head(url, function(err, res, body) {
		var filename = url.split("/").pop();
		request(url).pipe(fs.createWriteStream("./img/" + filename));
		cb(0,url);
	});
};

// download('http://ww2.sinaimg.cn/large/8af1d297jw1f6wnvaxmh9j20bg0e0dnf.jpg', '', '12321.jpg');

var picFilter = ".commentlist .text p a";

request(options, function(error, response, body) {
	// urlLog.info('url: ' + options.url + '\nresponse.statusCode: ' + response.statusCode);
	if (!error && response.statusCode == 200) {
		var $ = cheerio.load(body);
		var imgSrc = [];
		// 获取所有大图
		$(picFilter).map(function(i, el) {
			imgSrc.push($(this).attr("href"));
		});
		var i = 0;
		async.mapLimit(imgSrc, 3, function(url, cb) {
			console.log(url);
			download(url,cb);
			// callback(0, url);
		}, function(err, result) {
			console.log('final:');
			console.log(result);
		});
	} else {
		console.log('error: ' + error);
		console.log('response.statusCode：' + response.statusCode);
		console.log(body);
	};
});
