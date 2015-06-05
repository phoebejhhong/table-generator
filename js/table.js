var tableGenerator = tableGenerator || {};

(function () {

  var Table = tableGenerator.Table = React.createClass({

    render: function() {
      var that = this;
      var rows = this.props.rows.map(function (row) {
        var cells = $.map(row, function (cell) {
          // print &nbsp; when cell is empty
          var cellValue = cell.length == 0 ? "\u00a0" : cell
          return (
            <td>
              <input
                ref="editField"
                className="edit"
                onBlur={that.props.onSubmit}
                // value={cellValue}
                />
            </td>
          );
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
