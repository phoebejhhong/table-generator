var tableGenerator = tableGenerator || {};

(function () {

  var Table = tableGenerator.Table;
  var TableSize = tableGenerator.TableSize;
  var Output = tableGenerator.Output;
  var Utils = tableGenerator.Utils;

  var App = tableGenerator.App = React.createClass({displayName: "App",

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
        React.createElement("div", {id: "app"}, 
          React.createElement("section", {id: "main"}, 
            React.createElement("nav", {id: "upper-nav"}, 
              React.createElement(TableSize, {
                rows: this.state.rows, 
                onChange: this.updateRows}), 
              React.createElement("div", {id: "header-option"}, 
                React.createElement("input", {
                  type: "checkbox", 
                  name: "headerOption", 
                  onChange: this.toggleHeader, 
                  checked: this.state.header}
                ), 
                React.createElement("span", null, "headers on top row")
              )
            ), 
              React.createElement(Table, {
                header: this.state.header, 
                rows: this.state.rows, 
                onSubmit: this.getRows}
              ), 
              React.createElement("div", {className: ""}

              ), 
              React.createElement(Output, {
                header: this.state.header, 
                rows: this.state.rows, 
                onChange: this.updateOutputOption, 
                currentOutput: this.state.currentOutput}
              )
          )
        )
      );
    },
  });

  React.render(
    React.createElement(App, null),
    document.getElementById('app')
  );

})();
