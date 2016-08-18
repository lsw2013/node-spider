var fs = require('fs');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var log4js = require('log4js');

// var urlLog = log.getLogger(1, 'urlLog');
// var bodyLog = log.getLogger(0, 'bodyLog');

var options = {
    url: 'http://jandan.net/ooxx/page-2096#comments',
    headers: {
        'User-Agent': ' Mozilla/5.0 (Windows NT 6.1; WOW64; rv:45.0) Gecko/20100101 Firefox/45.0'
    }
};

request(options, function (error, response, body) {
    // urlLog.info('url: ' + options.url + '\nresponse.statusCode: ' + response.statusCode);
    if (!error && response.statusCode == 200) {
    	var $ = cheerio.load(body);
    	var imgSrcArr = [];
    	// 获取所有大图
    	$(".commentlist .text p a").map(function(i,el) {
    	 	imgSrcArr.push($(this).attr("href"));
    	});
    } else {
        console.log('error: ' + error);
        console.log('response.statusCode：' + response.statusCode);
        console.log(body);
    };
});





