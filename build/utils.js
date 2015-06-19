var tableGenerator = tableGenerator || {};

(function () {

  var Utils = tableGenerator.Utils = {};
  // Methods to change row size

  // TODO: merge following two methods into one method

  Utils.updateRowNum = function (rows, newRowNum) {
    var gap = newRowNum - rows.length;

    if (gap < 0) {
      var newRows = rows.slice(0, gap);
    } else {
      // deep copy
      var newRows = rows.slice(0);
      for (var i = 0; i < gap; i++) {
        newRows.push([])
        for (var j = 0; j < rows[0].length; j++) {
          newRows[newRows.length - 1].push("");
        }
      }
    }

    return newRows;
  };

  Utils.updateColNum = function (rows, newColNum) {
    var gap = newColNum - rows[0].length;

    if (gap < 0) {
      var newRows = rows.map(function (row) {
        return row.slice(0, gap);
      });
    } else {
      var newRows = rows.map(function (row) {
        for (var i = 0; i < gap; i++) {
          row.push("");
        }
        return row
      });
    }

    return newRows;
  };

  // Methods to extend Array functionality

  Utils.range = function(startNum, endNum, step) {
    var array = [];
    array[0] = startNum;
    var step = step || 1;

    while (startNum + step <= endNum) {
      array[array.length]= startNum+= step;
    };

    return array;
  };

  Utils.uniqueCount = function (array) {
    var uniqueArray = [], count = 0;

    $.each(array, function(idx, el){
      if (uniqueArray.indexOf(el) < 0) {
        count += 1
        uniqueArray.push(el);
      }
    });

    return count;
  };

  Utils.max = function (array) {
    return Math.max.apply(null, array);
  };

})();
