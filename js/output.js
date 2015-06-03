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
      var table = document.getElementById('table');

      switch (this.state.currentOutput) {
        case "HTML":
        return table ? table.outerHTML : "";
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
          <code className="prettyprint">
            {outputResult}
          </code>
        </div>
      );
    },
  });

})();
