var EventRunner = (function () {
    function EventRunner(numContexts, numEvents, numHandlers) {
        this.numContexts = numContexts;
        this.numEvents = numEvents;
        this.numHandlers = numHandlers;
    }
    EventRunner.prototype._arrayFactory = function (numEntries, entryFactory) {
        var result = [];
        for (var i = 0; i < numEntries; i++) {
            result.push(entryFactory(i));
        }
        return result.shuffle();
    };
    EventRunner.prototype._getContexts = function () {
        return this._arrayFactory(this.numContexts, function (i) {
            return {data: i};
        });
    };
    EventRunner.prototype._getEvents = function () {
        return this._arrayFactory(this.numEvents, function (i) {
            return 'event' + i;
        });
    };
    EventRunner.prototype._getHandlers = function () {
        return this._arrayFactory(this.numHandlers, function (i) {
            return function (callback) {
                callback(i);
            }
        });
    };
    EventRunner.prototype._bind = function () {
        this.contexts = this._getContexts();
        this.events = this._getEvents();
        this.handlers = this._getHandlers();
        this.managers = [];
        this.contexts.forEach(function (context) {
            var manager = new EventManager(context);
            this.events.forEach(function (event) {
                this.handlers.forEach(function (handler) {
                    manager.bind(event, handler);
                }, this);
            }, this);
            this.managers.push(manager);
        }, this);
    };
    EventRunner.prototype._fire = function (done) {
        var timesToFire = 100;
        var callbackCalled = 0;
        var callbacksLimit = this.numContexts * this.numEvents * this.numHandlers * timesToFire;;
        var callback = function () {
            if (++callbackCalled == callbacksLimit) {
                done();
            }
        }
        for (var i = 0; i < timesToFire; i++) {
            this.managers.forEach(function (manager) {
                this.events.forEach(function (event) {
                    manager.fire(event, callback);
                });
            }, this);
        }
    };
    EventRunner.prototype._unbind = function () {
        this.events.shuffle();
        this.managers.forEach(function (manager) {
            this.events.forEach(function (event) {
                manager.unbind(event);
            });
        }, this);
    };
    EventRunner.prototype.run = function (done) {
        this._bind();
        var fromTime = +new Date();
        var self = this;
        this._fire(function () {
            self._unbind();
            console.log('Running (' + self.numContexts + ', ' + self.numEvents + ', ' + self.numHandlers  + ') took '
                + (+new Date() - fromTime));
            done();
        });
    };
    return EventRunner;
})();

describe('event', function () {
    // this is insane, but that's how jasmine works with async tests
    var done = false;
    beforeEach(function () {
        function runEvents(){
            new EventRunner(10, 10, 10).run(function () {
                new EventRunner(100, 10, 10).run(function () {
                    new EventRunner(10, 100, 10).run(function () {
                        new EventRunner(10, 10, 100).run(function () {
                            done = true;
                        });
                    });
                });
            });
        }
        runs(runEvents);
        waitsFor(function(){
            return done;
        });
    });

    it("complete", function () {
        expect(done).toBe(true);
    });
});