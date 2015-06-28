var tableGenerator = tableGenerator || {};

(function () {

  var OPTIONS = ["HTML", "JSON", "Markdown", "Image"];
  var LANGUAGES_MAP = {
    "HTML": "markup",
    "JSON": "javascript",
    "Markdown": "markdown",
    "Image": "markup",
  };

  var Convert = tableGenerator.Convert,
    Canvas = tableGenerator.Canvas;
  tableGenerator.Output = React.createClass({displayName: "Output",

  getOutputResult: function() {
    var rows = this.props.rows;
    switch (this.props.currentOutput) {
      case "HTML":
        return Convert.toHTMLTags(rows, this.props.header);
      case "JSON":
        return Convert.toJSON(rows, this.props.header);
      case "Markdown":
        return Convert.toMarkdown(rows, this.props.header);
      case "Image":
        return (
          React.createElement(Canvas, {
            rows: this.props.rows})
      );
    };
  },

  render: function() {
    var that = this;
    var optionAnchors = OPTIONS.map(function(option) {
      return (
        React.createElement("a", {
          href: "javascript:void(0)", 
          key: option, 
          onClick: that.props.onChange.bind(this, option), 
          className: that.props.currentOutput == option? "selected":""}, 
          option)
      );
    });

    var outputResult = this.getOutputResult();
    var langName = LANGUAGES_MAP[this.props.currentOutput]

    return (
      React.createElement("div", {id: "output"}, 
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
