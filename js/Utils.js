(function () {
  if (typeof TableGenerator == "undefined") {
    window.TableGenerator = {};
  }

  var Utils = TableGenerator.Utils = {};

  Utils.convertToHTMLTags = function (obj) {
    // TODO: prettify with indent
    return obj.outerHTML;
  };

  Utils.convertToJSON = function (obj) {
    obj.children
  }
})();
