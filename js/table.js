var tableGenerator = tableGenerator || {};

(function () {

  var Table = tableGenerator.Table = React.createClass({

    getInitialState: function() {
      return {rows: [["data1", ""], ["", ""]]}
    },

    editCell: function() {
      console.log("edt")
    },

    render: function() {
      var that = this;
      var rows = this.state.rows.map(function (row) {
        var cells = $.map(row, function (cell) {
          // print &nbsp; when cell is empty
          var cellValue = cell.length == 0 ? '\u00a0' : cell

          return (
            <td onClick={that.editCell}>
              <input type="text" value ={cellValue}  />
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
