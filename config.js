var log4js = require('log4js');

var config = function(){};

config.log4js = {
    "appenders": [
        // {
        //     "category":"console",
        //     "type":"console"
        // },
        {
            "category":'urlLog',
            "type":"dateFile",
            "filename":"url.log",
            maxLogSize: 10000000,
            backups:0
        },
        {
            category: "bodyLog",
            type: 'dateFile',
            filename: 'bodyLog',
            pattern: '-yyyy-MM-dd.log',
            alwaysIncludePattern: true
        }
    ],
    // replaceConsole: true,
    levels: {
        // 'console': 'All',
        'urlLog': 'INFO',
        'bodyLog': 'All'
    }
}

log4js.configure(config.log4js);

config.urlLog = log4js.getLogger('urlLog');
config.bodyLog = log4js.getLogger('bodyLog');
// config.console = log4js.getLogger('console');

exports.config = config;





