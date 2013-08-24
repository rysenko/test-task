Array.prototype.indexOfBinary = function (find) {
    var low = 0, high = this.length - 1, index, element;
    while (low <= high) {
        index = (low + high) >> 1;
        element = this[index];
        if (element < find) low = index + 1;
        else if (element > find) high = index - 1;
        else return index;
    }
    return ~low;
};

Array.prototype.shuffle = function () {
    var high = this.length;
    while (high--) {
        var index = (Math.random() * high) | 0;
        var tmp = this[high];
        this[high] = this[index];
        this[index] = tmp;
    }
    return this;
};