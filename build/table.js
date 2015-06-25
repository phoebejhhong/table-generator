var tableGenerator = tableGenerator || {};

(function () {

  var TableItem = tableGenerator.TableItem,
    Utils = tableGenerator.Utils;

  var Table = tableGenerator.Table = React.createClass({displayName: "Table",

    handleEdit: function (event) {
      $parent = $(event.target).parent();
      if ($parent.hasClass("editing")) {
        $parent.removeClass("editing");
      } else {
        $parent.addClass("editing");
      }
    },

    render: function() {
      var that = this;
      var headers = [];

      var rows = this.props.rows.map(function (row, rowIndex) {
        var cells = $.map(row, function (cell, colIdx) {
          if (rowIndex === 0 && that.props.header) {
            return (
              React.createElement("th", null, 
                React.createElement(TableItem, {
                  onFocus: that.handleEdit, 
                  onBlur: that.handleEdit, 
                  onSubmit: that.props.onSubmit, 
                  cellValue: cell}
                )
              )
            );
          } else {
            var className = (colIdx === 0 && that.props.colHeader ? "ch" : "");

            return (
              React.createElement("td", {
                className: className
              }, 
              React.createElement(TableItem, {
                onFocus: that.handleEdit, 
                onBlur: that.handleEdit, 
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
