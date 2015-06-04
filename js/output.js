var tableGenerator = tableGenerator || {};

(function () {

  var OPTIONS = ["HTML", "JSON", "Markdown"]

  var Utils = tableGenerator.Utils;
  var Output = tableGenerator.Output = React.createClass({

    getInitialState : function() {
      return {
        currentOutput : "HTML",
      };
    },

    updateOption: function(newOption) {
      console.log(newOption);
      this.setState({
        currentOutput : newOption
      });
    },

    getOutputResult: function() {
      var $table = $("table");
      // save rows as plain arrays in an array
      var rows = [];

      $table.find("tr").each(function (index) {
        var $cells = $(this).find("td");
        rows[index] = [];

        $cells.each(function () {
          rows[index].push($(this).text());
        });
      });

      switch (this.state.currentOutput) {
        case "HTML":
          return $table ? Utils.convertToHTMLTags(rows) : "";
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
          onClick={that.updateOption.bind(this, option)}>
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
