var tableGenerator = tableGenerator || {};

(function () {

  var TableItem = tableGenerator.TableItem;

  var Table = tableGenerator.Table = React.createClass({displayName: "Table",

    render: function() {
      var that = this;
      var headers = [];

      var rows = this.props.rows.map(function (row, rowIndex) {
        var cells = $.map(row, function (cell) {
          // // print &nbsp; when cell is empty
          // var cellValue = (cell.length == 0 ? "\u00a0" : cell);

          if (rowIndex == 0 && that.props.header) {
            return (
              React.createElement("th", null, 
                React.createElement(TableItem, {
                  onSubmit: that.props.onSubmit, 
                  cellValue: cell}
                )
              )
            );
          } else {
            return (
              React.createElement("td", null, 
              React.createElement(TableItem, {
                onSubmit: that.props.onSubmit, 
                cellValue: cell}
              )
              )
            );
          }
        });

        return (
          React.createElement("tr", null, 
            cells
          )
        );
      });

      return (
        React.createElement("table", {id: "table"}, 
          React.createElement("tbody", null, 
            rows
          )
        )
      );
    },

  });
})();
