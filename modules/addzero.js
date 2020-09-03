var addZero = function (index, length){
    length = length.toString().length;
    index = index.toString();
    while (index.length < length){
        index = '0' + index;
    }
    return index;
}

module.exports = addZero;
