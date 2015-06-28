var tableGenerator = tableGenerator || {};

(function () {

  var Table = tableGenerator.Table;
  var UpperNav = tableGenerator.UpperNav;
  var Output = tableGenerator.Output;
  var Utils = tableGenerator.Utils;

  var App = tableGenerator.App = React.createClass({displayName: "App",

    getInitialState: function() {
      return {
        title: undefined,
        header: true,
        colHeader: true,
        rows: [["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""]],
        currentOutput: "HTML",
        currentTheme: "base16_ocean_dark",
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
      return (
        React.createElement("div", {id: "app"}, 
          React.createElement("section", {id: "main"}, 
            React.createElement(UpperNav, {
              rows: this.state.rows, 
              header: this.state.header, 
              colHeader: this.state.colHeader, 
              currentTheme: this.state.currentTheme, 
              onChange: this.setState.bind(this), 
              onTableSizeChange: this.updateRows}
            ), 
            React.createElement(Table, {
              header: this.state.header, 
              colHeader: this.state.colHeader, 
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
