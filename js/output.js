var tableGenerator = tableGenerator || {};

(function () {

  var OPTIONS = ["HTML", "JSON", "Markdown"]
  var LANGUAGES_MAP = {
    "HTML": "markup",
    "JSON": "javascript",
    "Markdown": "markdown"
  };

  var Utils = tableGenerator.Utils;
  var Output = tableGenerator.Output = React.createClass({

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
          <a
            href="javascript:void(0)"
            key={option}
            onClick={that.props.onChange.bind(this, option)}
            className={that.props.currentOutput == option? "selected":""}>
            {option}</a>
        );
      });

      var outputResult = this.getOutputResult();
      var langName = LANGUAGES_MAP[this.props.currentOutput]

      return (
        <div id="output">
          <nav>
            {optionAnchors}
          </nav>
          <code className={"language-" + langName}>
            {outputResult}
          </code>
        </div>
      );
    },
  });

})();
