var fs = require('fs');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var log4js = require('log4js');

var urlLog = log.getLogger(1, 'urlLog');
var bodyLog = log.getLogger(0, 'bodyLog');

var options = {
    url: 'http://jandan.net/ooxx/page-1',
    headers: {
        'User-Agent': ' Mozilla/5.0 (Windows NT 6.1; WOW64; rv:45.0) Gecko/20100101 Firefox/45.0'
    }
};

request(options, function (error, response, body) {
    urlLog.info('url: ' + options.url + '\nresponse.statusCode: ' + response.statusCode);
    if (!error && response.statusCode == 200) {
        // console.log(body);    //返回请求页面的HTML
        // bodyLog.info(body);
    } else {
        console.log('error: ' + error);
        console.log('response.statusCode：' + response.statusCode);
        console.log(body);
    };
});







