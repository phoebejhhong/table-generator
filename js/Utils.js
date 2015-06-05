var tableGenerator = tableGenerator || {};

(function () {

  var Utils = tableGenerator.Utils = {};

  // TODO: headers!!!

  Utils.convertToHTMLTags = function (rows) {
    var openingTags = "<table><tbody>";
    var innerTags = "";

    $.each(rows, function(idx, row) {
      innerTags += "<tr>"

      $.each(row, function(idx, cell) {
        innerTags += "<td>" + cell + "</td>";
      });

      innerTags += "</tr>"
    });

    var closingTags = "</tbody></table>";

    return openingTags + innerTags + closingTags;
  };

  Utils.convertToJSON = function (rows) {
    return JSON.stringify(rows);
  };

  Utils.convertToMarkdown = function (rows) {
    var result = "";

    $.each(rows, function (idx, row) {
      result += "|"

      $.each(row, function (idx, cell) {
        result += cell + "|";
      });

      result += "\n"
    });

    return result;
  };
})();
