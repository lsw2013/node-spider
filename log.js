var log4js = require('log4js');

log4js.loadAppender('file');
log4js.loadAppender('datefile');

var Logger = function () {
    this._logger = null;
    this._name = null;
};

Logger.getLogger = function (type, name, level) {
    name = String(name || '_');
    level = level || 'DEBUG';
    var logConfig = {};
    if (!type) {
        log4js.addAppender(log4js.appenderMakers['file']({
            filename: name + '.log',
            maxLogSize: 1000000000,
            backups: 0
        }), name);
    } else {
        log4js.addAppender(log4js.appenderMakers['datefile']({
            filename: name,
            pattern: '.yyyy-MM-dd.log',
            alwaysIncludePattern: true
        }), name);
    };
    var logger = log4js.getLogger(name);
    logger.setLevel(level);
    return logger;
}

var log = Logger.getLogger(1, 'llog');
log.info('haha');

module.exports = Logger;







