var tableGenerator = tableGenerator || {};

(function () {

  var TableItem = tableGenerator.TableItem,
    Utils = tableGenerator.Utils;

  tableGenerator.Table = React.createClass({

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
              <th>
                <TableItem
                  onFocus={that.handleEdit}
                  onBlur={that.handleEdit}
                  onSubmit={that.props.onSubmit}
                  cellValue={cell}
                />
              </th>
            );
          } else {
            var className = (colIdx === 0 && that.props.colHeader ? "ch" : "");

            return (
              <td
                className={className}
              >
              <TableItem
                onFocus={that.handleEdit}
                onBlur={that.handleEdit}
                onSubmit={that.props.onSubmit}
                cellValue={cell}
              />
              </td>
            );
          }
        });

        return (
          <tr>
            {cells}
          </tr>
        );
      });

      return (
        <table id="table">
          <tbody>
            {rows}
          </tbody>
        </table>
      );
    },

  });
})();
