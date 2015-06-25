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
        colHeader: true,
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
          rows[index].push($(this).find("textarea").val());
        });
      });

      this.setState({rows: rows});
    },

    updateRows: function (newRows) {
      this.setState({
        rows: newRows
      },
        this.resizeTextAreas.bind(this)
      );
    },

    resizeTextAreas: function() {
      $("tr").each(function (idx, tr) {
        var textAreas = $(tr).find("textarea");

        textAreas.css({"height": "auto"});

        var scrollHeights = textAreas.map(function (idx, tA) {
          return tA.scrollHeight
        }),
        maxScrollHeight = Utils.max(scrollHeights);
        textAreas.height(maxScrollHeight - 16);
      });
    },

    toggleHeader: function() {
      this.setState({
        header: !this.state.header
      });
    },

    toggleColHeader: function() {
      this.setState({
        colHeader: !this.state.colHeader
      });
    },

    updateOutputOption: function (newOption) {
      this.setState({
        currentOutput : newOption
      });
    },

    componentDidMount: function() {
      window.addEventListener('resize', this.resizeTextAreas);
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
                React.createElement("span", null, "headers on top row"), 
                React.createElement("input", {
                  type: "checkbox", 
                  name: "headerOption", 
                  onChange: this.toggleColHeader, 
                  checked: this.state.colHeader}
                ), 
                React.createElement("span", null, "headers on first column")
              )
            ), 
              React.createElement(Table, {
                header: this.state.header, 
                colHeader: this.state.colHeader, 
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
