var tableGenerator = tableGenerator || {};

(function () {

  var Table = tableGenerator.Table;
  var Output = tableGenerator.Output;
  var App = tableGenerator.App = React.createClass({

    getInitialState: function() {
      return {
        rows: [["", ""], ["", ""]],
        currentOutput : "HTML",
      };
    },

    getRows: function () {
      var $table = $("table");
      // save rows as plain arrays in an array
      var rows = [];

      $table.find("tr").each(function (index) {
        var $cells = $(this).find("td");
        rows[index] = [];

        $cells.each(function () {
          rows[index].push($(this).find("input").val());
        });
      });

      this.setState({rows: rows});
    },

    updateOutputOption: function(newOption) {
      this.setState({
        currentOutput : newOption
      });
    },

    componentDidUpdate: function() {
      Prism.highlightAll();
    },

    render: function() {
      return (
        <div id="app">
          <header id="header">
            <h1>Table Generator</h1>
          </header>
          <section id ="main">
            <nav id="upper-nav">
              <input
                type="checkbox"
                name="headerOption"
              />
              <span>headers on top row</span>
            </nav>
              <Table
                rows={this.state.rows}
                onSubmit={this.getRows}
              />
              <Output
                rows={this.state.rows}
                onChange={this.updateOutputOption}
                currentOutput={this.state.currentOutput}
              />
          </section>
        </div>
      );
    },
  });

  React.render(
    <App/>,
    document.getElementById('app')
  );

})();
