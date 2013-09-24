module.exports = function (config) {
    config.set({
        basePath : '../',
        frameworks : ['jasmine'],
        files : [
            "utils/array.js",
            "event/eventManager.js",
            "test/eventBrowser.js"
        ],
        autoWatch : false,
        singleRun: true,
        browsers: ['Chrome'],
        plugins: [
            "karma-jasmine",
            "karma-phantomjs-launcher",
            "karma-chrome-launcher",
            "karma-firefox-launcher"
        ]
    });
};