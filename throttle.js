module.exports = function (func, timeout) {
    var lastCalled = 0;
    var wrapper = function () {
        var currentTime = +new Date();
        if (currentTime - lastCalled >= timeout) {
            lastCalled = currentTime;
            func.apply(this, arguments);
        }
    };
    return wrapper;
};