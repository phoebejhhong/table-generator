var tableGenerator = tableGenerator || {};

(function () {

  var Table = tableGenerator.Table = React.createClass({

    render: function() {
      var that = this;
      var headers = [];

      var rows = this.props.rows.map(function (row, rowIndex) {
        var cells = $.map(row, function (cell) {
          // print &nbsp; when cell is empty
          var cellValue = cell.length == 0 ? "\u00a0" : cell

          if (rowIndex == 0 && that.props.header) {
            return (
              <th>
                <input
                  type="text"
                  ref="editField"
                  className="edit"
                  onBlur={that.props.onSubmit}
                  value={cellValue}
                  />
              </th>
            );
          } else {
            return (
              <td>
                <input
                  ref="editField"
                  className="edit"
                  onBlur={that.props.onSubmit}
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
