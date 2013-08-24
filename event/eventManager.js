var EventManager = (function () {
    function EventManager(context) {
        this.context = context;
        this.bindings = {};
    }
    EventManager.prototype.bind = function (eventName, handler) {
        if (!this.bindings[eventName]) this.bindings[eventName] = []
        this.bindings[eventName].push(handler);
    };
    EventManager.prototype.unbind = function (eventName) {
        this.bindings[eventName] = [];
    };
    EventManager.prototype.fire = function (eventName, params) {
        var eventHandlers = this.bindings[eventName] || [];
        for (var i = 0, len = eventHandlers.length; i < len; i++) {
            eventHandlers[i].call(this.context, params);
        }
    };
    return EventManager;
})();

module.exports = EventManager;