var log4js = require('log4js');

log4js.loadAppender('file');
log4js.loadAppender('datefile');

var Logger = function () {
    this._logger = null;
    this._name = null;
};

var _loggers = {};

Logger.getLogger = function (type, name, level) {
    name = String(name || '_');
    level = level || 'DEBUG';
    var logConfig = {};
    var logger = _loggers[name];
    if (!logger) {
        logger = new Logger();
        logger._name = name;
        if (!type) {
            log4js.addAppender(log4js.appenderMakers['file']({
                filename: name + '.log',
                maxLogSize: 1000000000,
                backups: 0
            }), name);
            logger._logger = log4js.getLogger(name);
            logger._logger.setLevel(logConfig.level);
        } else {
            log4js.addAppender(log4js.appenderMakers['datefile']({
                filename: name,
                pattern: '.yyyy-MM-dd.log',
                alwaysIncludePattern: true
            }), name);
            logger._logger = log4js.getLogger(name);
            logger._logger.setLevel(logConfig.level);
        };
        _loggers[name] = logger;
    }
    return logger;
};

Logger.prototype.debug = function(log) {
	// debug的log
	this._logger.debug(log);
};

Logger.prototype.info = function(log) {
	this._logger.info(log);
};

Logger.prototype.warn = function(log) {
	this._logger.warn(log);
};

Logger.prototype.error = function(log, err) {
	err = err || {};
	this._logger.error(log);
	// 如果err是个对象，其中可能含有message或者stack这两种属性
	if (err.message) {
		this._logger.error(err.message);
	}
	if (err.stack) {
		this._logger.error(err.stack);
	}
};

module.exports = Logger;















