var tableGenerator = tableGenerator || {};

(function () {

  var TableItem = tableGenerator.TableItem,
    Utils = tableGenerator.Utils;

  var Table = tableGenerator.Table = React.createClass({

    handleEdit: function (event) {
      $parent = $(event.target).parent();
      if ($parent.hasClass("editing")) {
        $parent.removeClass("editing");
      } else {
        $parent.addClass("editing");
      }
    },

    resizeTextAreas: function() {
      $("tr").each(function (idx, tr) {
        var textAreas = $(tr).find("textarea");

        textAreas.css({"height": "auto"});

        var scrollHeights = textAreas.map(function (idx, tA) {
          return tA.scrollHeight
        }),
        maxScrollHeight = Utils.max(scrollHeights);
        console.log(maxScrollHeight);
        textAreas.height(maxScrollHeight - 16);
      });
    },

    componentDidMount: function() {
      window.addEventListener('resize', this.resizeTextAreas);
    },

    componentDidUpdate: function() {
      // TODO: resize only when the table size is modified
      this.resizeTextAreas();
    },

    render: function() {
      var that = this;
      var headers = [];

      var rows = this.props.rows.map(function (row, rowIndex) {
        var cells = $.map(row, function (cell) {
          if (rowIndex == 0 && that.props.header) {
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
            return (
              <td>
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
