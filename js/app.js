var tableGenerator = tableGenerator || {};

(function () {

  var Table = tableGenerator.Table;
  var Output = tableGenerator.Output;
  var App = tableGenerator.App = React.createClass({

    getInitialState: function() {
      return {
        header: false,
        rows: [["", ""], ["", ""], ["", ""], ["", ""]],
        currentOutput : "HTML",
      };
    },

    toggleHeader: function() {
      this.setState({
        header: !this.state.header
      });
    },

    getRows: function() {
      var $table = $("table");
      // save rows as plain arrays in an array
      var rows = [];

      $table.find("tr").each(function (index) {
        var $cells = $(this).find("th, td");
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
                onChange={this.toggleHeader}
              />
              <span>headers on top row</span>
            </nav>
              <Table
                header={this.state.header}
                rows={this.state.rows}
                onSubmit={this.getRows}
              />
              <Output
                header={this.state.header}
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
