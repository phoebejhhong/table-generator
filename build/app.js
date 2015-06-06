var tableGenerator = tableGenerator || {};

(function () {

  var Table = tableGenerator.Table;
  var Output = tableGenerator.Output;
  var Utils = tableGenerator.Utils;

  var App = tableGenerator.App = React.createClass({displayName: "App",

    MAX_ROW_COL_NUM: 12,

    getInitialState: function() {

      return {
        header: true,
        rows: [["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""]],
        currentOutput : "HTML",
      };
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

    updateRowNum: function(event) {
      var currentRows = this.state.rows;
      var newNum = Number(event.target.value);
      var gap = newNum - currentRows.length;

      if (gap < 0) {
        this.setState({
          rows: currentRows.slice(0, gap)
        });
      } else {
        var newRow = [];
        for (var i = 0; i < currentRows[0].length; i++) {
          newRow[i] = "";
        }
        for (var i = 0; i < gap; i++) {
          currentRows.push(newRow);
        }

        this.setState({
          row: currentRows
        });
      }
    },

    updateColNum: function() {
      console.log("update");

      var newRows = this.state.rows.map(function(row) {
        return row.slice(0, gap);
      });

      this.setState({
        rows: newRows
      });
    },

    toggleHeader: function() {
      this.setState({
        header: !this.state.header
      });
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
      var that = this;

      var tableSizes = Utils.range(1, this.MAX_ROW_COL_NUM);

      var colOptionTags = tableSizes.map(function (size) {
        return (
          React.createElement("option", null, 
            size
          )
        )
      });

      var rowOptionTags = tableSizes.map(function (size) {
        return (
          React.createElement("option", null, 
            size
          )
        )
      });

      return (
        React.createElement("div", {id: "app"}, 
          React.createElement("header", {id: "header"}, 
            React.createElement("h1", null, "Table Generator")
          ), 
          React.createElement("section", {id: "main"}, 
            React.createElement("nav", {id: "upper-nav"}, 
              React.createElement("span", null, 
                "Table Size:", 
                React.createElement("select", {
                  onChange: this.updateColNum, 
                  value: that.state.rows[0].length}, 
                  colOptionTags
                ), 
                "X", 
                React.createElement("select", {
                  onChange: this.updateRowNum, 
                  value: that.state.rows.length}, 
                  rowOptionTags
                )
              ), 
              React.createElement("input", {
                type: "checkbox", 
                name: "headerOption", 
                onChange: this.toggleHeader, 
                checked: this.state.header}
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
