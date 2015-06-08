var tableGenerator = tableGenerator || {};

(function () {

  var Utils = tableGenerator.Utils;
  var Convert = tableGenerator.Convert = {};

  // Methods to convert table into something else

  Convert.toHTMLTags = function (rows, header) {

    var openingTags = "<table>\n\t<tbody>";
    var innerTags = "";

    $.each(rows, function(rowIdx, row) {
      innerTags += "\n\t\t<tr>"
      if (rowIdx == 0 && header) {
        $.each(row, function(idx, cell) {
          innerTags += "\n\t\t\t<th>" + cell + "</th>";
        });

      } else {
        $.each(row, function(idx, cell) {
          innerTags += "\n\t\t\t<td>" + cell + "</td>";
        });

      }

      innerTags += "\n\t\t</tr>"
    });

    var closingTags = "\n\t</tbody>\n</table>";

    return openingTags + innerTags + closingTags;
  };

  Convert.toJSON = function (rows, header) {
    if (header) {
      var rowsWithHeaders = [];
      var headers = rows[0];
      var dataRows = rows.slice(1);

      if (Utils.uniqueCount(headers) !== headers.length) {
        return "/* Fill headers with unique values first! */";
      }

      $.each(dataRows, function (dataRowIdx, dataRow) {
        rowsWithHeaders[dataRowIdx] = {};

        $.each(dataRow, function (dataCellIdx, dataCell) {
          rowsWithHeaders[dataRowIdx][headers[dataCellIdx]] = dataCell;
        });
      })

      return JSON.stringify(rowsWithHeaders);
    } else {
      return JSON.stringify(rows);
    }
  };

  Convert.toMarkdown = function (rows, header) {
    // TODO: prettify

    var result = "";

    $.each(rows, function (rowIdx, row) {
      result += "|"

      $.each(row, function (idx, cell) {
        result += cell + "|";
      });

      result += "\n"
      if (rowIdx == 0 && header) {
        result += "|"
        for (var i = 0; i < row.length; i++) {
          result += "---|"
        }
        result += "\n"
      }
    });

    return result;
  };
})();
