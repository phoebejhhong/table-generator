var tableGenerator = tableGenerator || {};

(function () {

  var Table = tableGenerator.Table;
  var Output = tableGenerator.Output;
  var App = tableGenerator.App = React.createClass({displayName: "App",

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
        React.createElement("div", {id: "app"}, 
          React.createElement("header", {id: "header"}, 
            React.createElement("h1", null, "Table Generator")
          ), 
          React.createElement("section", {id: "main"}, 
            React.createElement("nav", {id: "upper-nav"}, 
              React.createElement("input", {
                type: "checkbox", 
                name: "headerOption", 
                onChange: this.toggleHeader}
              ), 
              React.createElement("span", null, "headers on top row")
            ), 
              React.createElement(Table, {
                header: this.state.header, 
                rows: this.state.rows, 
                onSubmit: this.getRows}
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
