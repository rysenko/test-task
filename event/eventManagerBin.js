require('../utils/array');

var EventManagerBin = (function () {
    function EventManagerBin(context) {
        this.context = context;
        this.bindingNames = [];
        this.bindingValues = [];
    }
    EventManagerBin.prototype.bind = function (eventName, handler) {
        var bindingIndex = this.bindingNames.indexOfBinary(eventName);
        if (bindingIndex < 0) {
            bindingIndex = ~bindingIndex;
            this.bindingNames.splice(bindingIndex, 0, eventName);
            this.bindingValues.splice(bindingIndex, 0, []);
        }
        this.bindingValues[bindingIndex].push(handler);
    };
    EventManagerBin.prototype.unbind = function (eventName) {
        var bindingIndex = this.bindingNames.indexOfBinary(eventName);
        if (bindingIndex >= 0) {
            this.bindingNames.splice(bindingIndex, 1);
            this.bindingValues.splice(bindingIndex, 1);
        }
    };
    EventManagerBin.prototype.fire = function (eventName, params) {
        var bindingIndex = this.bindingNames.indexOfBinary(eventName);
        if (bindingIndex >= 0) {
            var eventHandlers = this.bindingValues[bindingIndex];
            for (var i = 0, len = eventHandlers.length; i < len; i++) {
                eventHandlers[i].call(this.context, params);
            }
        }
    };
    return EventManagerBin;
})();

module.exports = EventManagerBin;