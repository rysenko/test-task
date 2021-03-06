var throttle = require('../throttle');
var assert = require('assert');

describe('throttle', function () {
    it('basic', function (done) {
        const throttleTimeout = 500;
        const callTimeout = 15;
        const totalCalls = 50;
        var timesCalled = 0;
        var initialFunc = function (param) {
            console.log('Called with ' + param);
            timesCalled++;
        };
        var throttledFunc = throttle(initialFunc, throttleTimeout);
        var timesToCall = totalCalls;
        var callThrottled = function () {
            throttledFunc(timesToCall);
            if (--timesToCall > 0) {
                setTimeout(callThrottled, callTimeout);
            } else {
                assert.equal(Math.ceil(callTimeout * totalCalls / throttleTimeout), timesCalled);
                done();
            }
        }
        callThrottled();
    });
});