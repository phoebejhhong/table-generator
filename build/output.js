var tableGenerator = tableGenerator || {};

(function () {

  var OPTIONS = ["HTML", "JSON", "Markdown"]
  var LANGUAGES_MAP = {
    "HTML": "markup",
    "JSON": "javascript",
    "Markdown": "markdown"
  };

  var Utils = tableGenerator.Utils;
  var Output = tableGenerator.Output = React.createClass({displayName: "Output",

    getOutputResult: function() {
      var rows = this.props.rows;

      switch (this.props.currentOutput) {
        case "HTML":
          return Utils.convertToHTMLTags(rows, this.props.header);
        case "JSON":
          return Utils.convertToJSON(rows, this.props.header);
        case "Markdown":
          return Utils.convertToMarkdown(rows, this.props.header);
      };
    },

    render: function() {

      var that = this;
      var optionAnchors = OPTIONS.map(function(option) {
        return (
          React.createElement("a", {key: option, 
            onClick: that.props.onChange.bind(this, option)}, 
            option)
        );
      });

      var outputResult = this.getOutputResult();
      var langName = LANGUAGES_MAP[this.props.currentOutput]

      return (
        React.createElement("div", {className: "output"}, 
          React.createElement("nav", null, 
            optionAnchors
          ), 
          React.createElement("code", {className: "language-" + langName}, 
            outputResult
          )
        )
      );
    },
  });

})();
