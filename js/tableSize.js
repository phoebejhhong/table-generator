var tableGenerator = tableGenerator || {};

(function () {

  var Utils = tableGenerator.Utils;

  tableGenerator.TableSize = React.createClass({

    MAX_ROW_COL_NUM: 12,

    updateTableSize: function (newColNum, newRowNum) {
      var newRows = Utils.updateRowNum(this.props.rows, newRowNum);
      newRows = Utils.updateColNum(newRows, newColNum);

      this.emptyTableGrid();
      // close dropdown
      this.props.onSubmit();
      this.props.onTableSizeChange(newRows);
    },

    drawTableGrid: function (colNum, rowNum, isFixed) {
      this.emptyTableGrid();

      // different class name for existing table size
      // and temprary mouseover event size
      var className = (isFixed ? "fixed" : "filled")

      // show grid size info if it's temporary
      if (!isFixed) {
        this.showInfo();
      };

      $rowsToPaint = $(".grid-row").slice(0, rowNum);

      $rowsToPaint.each(function (rowIdx, row) {
        $cellsToPaint = $(row).find(".grid-cell").slice(0, colNum);

        $cellsToPaint.each(function (colIdx, cell) {
          $(cell).addClass(className);
        });
      });
    },

    emptyTableGrid: function() {
      $(".grid-cell").removeClass("filled");
      this.hideInfo();
    },

    showInfo: function() {
      $info = $("#grid-info");
      $info.removeClass("hidden");
    },

    hideInfo: function() {
      $("#grid-info").addClass("hidden");
    },

    handleInfo: function(colIdx,rowIdx,event) {
      $info.css({left:event.pageX + 10, top:event.pageY + 10});
      $info.text(colIdx + " X " + rowIdx);
    },

    componentDidMount: function() {
      // draw fixed table size once loaded
      var currentColNum =this.props.rows[0].length,
        currentRowNum = this.props.rows.length;

      this.drawTableGrid(currentColNum, currentRowNum, true);
    },

    componentDidUpdate: function() {
      // draw fixed table size again
      $(".fixed").removeClass("fixed");
      var currentColNum =this.props.rows[0].length,
        currentRowNum = this.props.rows.length;

      this.drawTableGrid(currentColNum, currentRowNum, true);
    },

    render: function() {
      var that = this;
      var tableSizes = Utils.range(1, this.MAX_ROW_COL_NUM);

      var gridRows = tableSizes.map(function (size, rowIdx) {
        var gridCells = tableSizes.map(function (size, colIdx) {
          return (
            <div
              onMouseOver={that.drawTableGrid.bind(this, colIdx+1, rowIdx+1, false)}
              onMouseOut={that.emptyTableGrid}
              onClick={that.updateTableSize.bind(this, colIdx+1, rowIdx+1)}
              onMouseMove={that.handleInfo.bind(this, colIdx+1, rowIdx+1)}
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
        <div
        id="table-size"
        className="nav-item"
        >
          <a
            href="javascript:void(0)"
            onClick={this.props.onClick}
            >
            Table Size:
            {" " + that.props.rows[0].length} X {that.props.rows.length}
            <i
              className="material-icons">
              &#xE5C5;
            </i>
          </a>
          <div
            className="dropdown"
            id="table-size-grid">
          {gridRows}
            <span
              id="grid-info"
              className="hidden">
            </span>
          </div>
        </div>
      )
    }
  });
})();
