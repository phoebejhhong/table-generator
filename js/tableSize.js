var tableGenerator = tableGenerator || {};

(function () {

  var Utils = tableGenerator.Utils;

  var TableSize = tableGenerator.TableSize = React.createClass({

    MAX_ROW_COL_NUM: 12,

    updateRowNum: function (rows, newRowNum) {
      var gap = newRowNum - rows.length;

      if (gap < 0) {
        var newRows = rows.slice(0, gap);
      } else {
        // deep copy
        var newRows = rows.slice(0);
        for (var i = 0; i < gap; i++) {
          newRows.push([])
          for (var j = 0; j < rows[0].length; j++) {
            newRows[newRows.length - 1].push("");
          }
        }
      }

      return newRows;
    },

    updateColNum: function (rows, newColNum) {
      var gap = newColNum - rows[0].length;

      if (gap < 0) {
        var newRows = rows.map(function (row) {
          return row.slice(0, gap);
        });
      } else {
        var newRows = rows.map(function (row) {
          for (var i = 0; i < gap; i++) {
            row.push("");
          }
          return row
        });
      }

      return newRows;
    },

    updateTableSize: function (newColNum, newRowNum) {
      var newRows = this.updateRowNum(this.props.rows, newRowNum);
      newRows = this.updateColNum(newRows, newColNum);

      this.props.onChange(newRows);
    },

    drawTableGrid: function (colNum, rowNum) {
      // empty cells first
      $(".grid-cell").removeClass("filled");

      $rowsToPaint = $(".grid-row").slice(0, rowNum);

      $rowsToPaint.each(function (rowIdx, row) {
        $cellsToPaint = $(row).find(".grid-cell").slice(0, colNum);
        $cellsToPaint.each(function (colIdx, cell) {
          $(cell).addClass("filled");
        });
      });
    },

    handleMouseOver: function(event) {
      $target = $(event.currentTarget);
    },

    componentDidMount: function() {
      this.drawTableGrid(this.props.rows[0].length, this.props.rows.length);
    },

    render: function() {
      var that = this;
      var tableSizes = Utils.range(1, this.MAX_ROW_COL_NUM);

      var gridRows = tableSizes.map(function (size, rowIdx) {
        var gridCells = tableSizes.map(function (size, colIdx) {
          return (
            <div
              onMouseOver={that.drawTableGrid.bind(this, colIdx+1, rowIdx+1)}
              onClick={that.updateTableSize.bind(this, colIdx+1, rowIdx+1)}
              className="grid-cell">
            </div>
          )
        });

        return (
          <div
            className="grid-row">
            {gridCells}
          </div>
        )
      });

      return (
        <div id="table-size">
          <a href="javascript:void(0)">
            Table Size:
            {that.props.rows[0].length} X {that.props.rows.length}
          </a>
          <div
            id="table-size-grid">
          {gridRows}
          </div>
        </div>
      )
    }

  });
})();
