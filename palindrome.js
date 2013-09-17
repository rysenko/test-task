module.exports = function (str) {
    str = str.replace(/\W/g, '');
    var low = 0, high = str.length - 1;
    while (low < high) {
        if (str.charAt(low++).toLowerCase() !== str.charAt(high--).toLowerCase()) {
            return false;
        }
    }
    return true;
};