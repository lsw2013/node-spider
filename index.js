var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var userAgentArr = require('./browser').userAgentArr;

var preUrl = 'http://jandan.net/ooxx/page-';

// var preHeaderObj = {
// 	'Accept': '*/*',
// 	'Accept-Encoding': 'gzip, deflate, sdch',
// 	'Accept-Language': 'zh-CN,zh;q=0.8',
// 	'Cache-Control': 'no-cache',
// 	'Connection': 'keep-alive',
// 	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
// 	'Cookie': 'duoshuo_unique=77eca2ee15339b5e',
// 	'Host': 'jandan.duoshuo.com',
// 	'Origin': 'http://jandan.net',
// 	'Pragma': 'no-cache',
// 	'Referer': 'http://jandan.net/ooxx'
// };
var preHeaderObj = {
	'Accept-Language': 'zh-CN,zh;q=0.8',
	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
	'Host': 'jandan.duoshuo.com',
	'Origin': 'http://jandan.net',
	'Referer': 'http://jandan.net/ooxx'
};

function getRandomNum(max) {
	var num = parseInt(Math.ceil(Math.random() * max));
	// console.log(num);
	return num;
};

function createHeader(count, preArgObj, userAgentArr) {
	var headers = [];
	for (var i = 0; i < count; i++) {
		headers[i] = {};
		// for(k in preArgObj) {
		// 	headers[i][k] = preArgObj[k];
		// };
		// headers[i] = preArgObj;
		// 如果不用for循环复制，那就一直用的是这一个对象，所以到最后所有的User-Agent 都是同一个。。。。
		headers[i]['User-Agent'] = userAgentArr[getRandomNum(userAgentArr.length)];

	};
	// console.log(headers);
	return headers;
}

var download = function(url, cb) {
	// var download = function(url, dir, filename) {
	request.head(url, function(err, res, body) {
		var filename = url.split("/").pop();
		request(url).pipe(fs.createWriteStream("./img/" + filename));
		cb(0, url);
	});
};

var headers = createHeader(20, preHeaderObj, userAgentArr);

var picFilter = ".commentlist .text p a";

function getReqOption(begin, end) {
	var begin = begin || 0;
	var end = end || 0;
	var optionArr = [];
	var option = {};
	var url = '';
	for (; begin <= end; begin++) {
		url = preUrl + begin + '#comments';
		optionArr.push({
			url: url,
			headers: headers[getRandomNum(headers.length)] || 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36'
		});
	};
	return optionArr;
};

function getHtml(option, cb) {
	setTimeout(request(options, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var state = "get " + option.url + " success";
				console.log(state);
				cb(0, state);
				return;
				var $ = cheerio.load(body);
				var imgSrc = [];
				// 获取所有大图
				$(picFilter).map(function(i, el) {
					imgSrc.push($(this).attr("href"));
				});
				// async.mapLimit(imgSrc, 3, function(url, cb) {
				// 	console.log(url);
				// 	download(url,cb);
				// 	// callback(0, url);
				// }, function(err, result) {
				// 	console.log('final:');
				// 	console.log(result);
				// });
			} else {
				console.log('error: ' + error);
				console.log('response.statusCode：' + response.statusCode);
				// console.log(body);
				var state = "get " + option.url + " faile";
				console.log(state);
				cb(0, state);
			};
		}), (parseInt(Math.random() * 10) + 1) * 100)
		// request(options, function(error, response, body) {
		// 	if (!error && response.statusCode == 200) {
		// 		var state = "get " + option.url + " success";
		// 		console.log(state);
		// 		cb(0, state);
		// 		return;
		// 		var $ = cheerio.load(body);
		// 		var imgSrc = [];
		// 		// 获取所有大图
		// 		$(picFilter).map(function(i, el) {
		// 			imgSrc.push($(this).attr("href"));
		// 		});
		// 		// async.mapLimit(imgSrc, 3, function(url, cb) {
		// 		// 	console.log(url);
		// 		// 	download(url,cb);
		// 		// 	// callback(0, url);
		// 		// }, function(err, result) {
		// 		// 	console.log('final:');
		// 		// 	console.log(result);
		// 		// });
		// 	} else {
		// 		console.log('error: ' + error);
		// 		console.log('response.statusCode：' + response.statusCode);
		// 		// console.log(body);
		// 		var state = "get " + option.url + " faile";
		// 		console.log(state);
		// 		cb(0, state);
		// 	};
		// });
};

function csl(err, res) {
	err ? console.log(err) : console.log(res);
};

function randomsort(a, b) {
	return Math.random() > .5 ? -1 : 1;
	//用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1  
}

var htmlReqArr = getReqOption(100, 420);
htmlReqArr = htmlReqArr.sort(randomsort);
// console.log(htmlReqArr);
// return;

async.eachLimit(htmlReqArr, 2, function(option, cbHtml) {
	// setTimeout(function() {
	// console.log(option);
	request(option, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var state = "get " + option.url + " success";
				console.log(state);
				cbHtml(0, state);
			} else {
				// console.log('error: ' + error);
				// console.log('response.statusCode：' + response.statusCode);
				// console.log(body);
				var state = "get " + option.url + " fail";
				console.log(state);
				cbHtml(0, state);
			};
		})
		// }, (parseInt(Math.random() * 10) + 1) * 100);
		// request(option, function(error, response, body) {
		// 	if (!error && response.statusCode == 200) {
		// 		var state = "get " + option.url + " success";
		// 		console.log(state);
		// 		cbHtml(0, state);
		// 	} else {
		// 		console.log('error: ' + error);
		// 		console.log('response.statusCode：' + response.statusCode);
		// 		console.log(body);
		// 		return;
		// 		var state = "get " + option.url + " fail";
		// 		console.log(state);
		// 		cbHtml(0, state);
		// 	};
		// });
}, function csl(err, res) {
	err ? console.log(err) : console.log(res);
});
