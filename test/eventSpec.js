require('../utils/array');
var EventManager = require('../event/eventManager');

var Generator = (function () {
    function Generator (numContexts, numEvents, numHandlers) {
        this.numContexts = numContexts;
        this.numEvents = numEvents;
        this.numHandlers = numHandlers;
    }
    Generator.prototype._arrayFactory = function (numEntries, entryFactory) {
        var result = [];
        for (var i = 0; i < numEntries; i++) {
            result.push(entryFactory(i));
        }
        return result.shuffle();
    };
    Generator.prototype.getContexts = function () {
        return this._arrayFactory(this.numContexts, function (i) {
            return {data: i};
        });
    };
    Generator.prototype.getEvents = function () {
        return this._arrayFactory(this.numEvents, function (i) {
            return 'event' + i;
        });
    };
    Generator.prototype.getHandlers = function () {
        return this._arrayFactory(this.numHandlers, function (i) {
            return function (callback) {
                callback(i);
            }
        });
    };
    return Generator;
})();

var runner = function (numContexts, numEvents, numHandlers, done) {
    var generator = new Generator(numContexts, numEvents, numHandlers);
    var contexts = generator.getContexts();
    var events = generator.getEvents();
    var handlers = generator.getHandlers();
    var timesToFire = 100;
    var managers = [];
    // binding
    contexts.forEach(function (context) {
        var manager = new EventManager(context);
        events.forEach(function (event) {
            handlers.forEach(function (handler) {
                manager.bind(event, handler);
            });
        });
        managers.push(manager);
    });
    var callbackCalled = 0;
    var callbacksLimit = numContexts * numEvents * numHandlers * timesToFire;;
    var callback = function () {
        if (++callbackCalled == callbacksLimit) {
            console.log('to ' + new Date().getMilliseconds());
            done();
        }
    }
    // firing
    console.log('from ' + new Date().getMilliseconds());
    for (var i = 0; i < timesToFire; i++) {
        managers.forEach(function (manager) {
            events.forEach(function (event) {
                manager.fire(event, callback);
            });
        });
    }
    // unbinding
    events.shuffle();
    managers.forEach(function (manager) {
        events.forEach(function (event) {
            manager.unbind(event);
        });
    });
};

describe('event', function () {
    it('subscription and firing (10,10,10)', function (done) {
        runner(10, 10, 10, done);
    });
    it('subscription and firing (100,10,10)', function (done) {
        runner(100, 10, 10, done);
    });
    it('subscription and firing (10,100,10)', function (done) {
        this.timeout(60000);
        runner(10, 100, 10, done);
    });
    it('subscription and firing (10,10,100)', function (done) {
        runner(10, 10, 100, done);
    });
});