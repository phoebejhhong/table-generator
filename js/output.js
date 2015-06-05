var tableGenerator = tableGenerator || {};

(function () {

  var OPTIONS = ["HTML", "JSON", "Markdown"]

  var Utils = tableGenerator.Utils;
  var Output = tableGenerator.Output = React.createClass({

    getOutputResult: function() {
      var rows = this.props.rows;

      switch (this.props.currentOutput) {
        case "HTML":
          return Utils.convertToHTMLTags(rows);
        case "JSON":
          return Utils.convertToJSON(rows);
        case "Markdown":
          return Utils.convertToMarkdown(rows);
      };
    },

    render: function() {

      var that = this;
      var optionAnchors = OPTIONS.map(function(option) {
        return (
          <a key={option}
            onClick={that.props.onChange.bind(this, option)}>
            {option}</a>
        );
      });

      var outputResult = this.getOutputResult();

      return (
        <div className="output">
          <nav>
            {optionAnchors}
          </nav>
          <code className="language-html">
            {outputResult}
          </code>
        </div>
      );
    },
  });

})();
