var tableGenerator = tableGenerator || {};

(function () {

  var Table = tableGenerator.Table;
  var TableSize = tableGenerator.TableSize;
  var Output = tableGenerator.Output;
  var Utils = tableGenerator.Utils;

  var App = tableGenerator.App = React.createClass({

    getInitialState: function() {
      return {
        header: true,
        rows: [["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""]],
        currentOutput : "HTML",
      };
    },

    getRows: function() {
      var $table = $("table");
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

    updateRows: function (newRows) {
      this.setState({
        rows: newRows
      })
    },

    toggleHeader: function() {
      this.setState({
        header: !this.state.header
      });
    },

    updateOutputOption: function (newOption) {
      this.setState({
        currentOutput : newOption
      });
    },

    componentDidUpdate: function() {
      Prism.highlightAll();
    },

    render: function() {
      var that = this;

      return (
        <div id="app">
          <header id="header">
            <h1>Table Generator</h1>
          </header>
          <section id ="main">
            <nav id="upper-nav">
              <TableSize
                rows={this.state.rows}
                onChange={this.updateRows} />
              <div id="header-option">
                <input
                  type="checkbox"
                  name="headerOption"
                  onChange={this.toggleHeader}
                  checked={this.state.header}
                />
                <span>headers on top row</span>
              </div>
            </nav>
              <Table
                header={this.state.header}
                rows={this.state.rows}
                onSubmit={this.getRows}
              />
              <div className="">
                
              </div>
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
