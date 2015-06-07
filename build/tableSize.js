var tableGenerator = tableGenerator || {};

(function () {

  var Utils = tableGenerator.Utils;

  var TableSize = tableGenerator.TableSize = React.createClass({displayName: "TableSize",

    MAX_ROW_COL_NUM: 12,

    toggleGrid: function () {
      $grid = $("#table-size-grid");
      if ($grid.hasClass("hidden")) {
        $("#table-size-grid").removeClass("hidden");
      } else {
        this.emptyTableGrid();
        $("#table-size-grid").addClass("hidden");
      }
    },

    updateTableSize: function (newColNum, newRowNum) {
      var newRows = Utils.updateRowNum(this.props.rows, newRowNum);
      newRows = Utils.updateColNum(newRows, newColNum);

      $("#table-size-grid").addClass("hidden");
      this.emptyTableGrid();
      this.props.onChange(newRows);
    },

    drawTableGrid: function (colNum, rowNum, isFixed) {
      this.emptyTableGrid();

      // differen class name for existing table size
      // and temprary mouseover event size
      var className = (isFixed ? "fixed" : "filled")

      $rowsToPaint = $(".grid-row").slice(0, rowNum);

      $rowsToPaint.each(function (rowIdx, row) {
        $cellsToPaint = $(row).find(".grid-cell").slice(0, colNum);

        $cellsToPaint.each(function (colIdx, cell) {
          $(cell).addClass(className);
        });
      });
    },

    emptyTableGrid: function () {
      $(".grid-cell").removeClass("filled");
    },

    componentDidMount: function() {
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
            React.createElement("div", {
              onMouseOver: that.drawTableGrid.bind(this, colIdx+1, rowIdx+1, false), 
              onClick: that.updateTableSize.bind(this, colIdx+1, rowIdx+1), 
              className: "grid-cell"}
            )
          )
        });

        return (
          React.createElement("div", {
            className: "grid-row"}, 
            gridCells
          )
        )
      });

      return (
        React.createElement("div", {id: "table-size"}, 
          React.createElement("a", {
            href: "javascript:void(0)", 
            onClick: this.toggleGrid}, 
            "Table Size:", 
            that.props.rows[0].length, " X ", that.props.rows.length
          ), 
          React.createElement("div", {
            className: "hidden", 
            id: "table-size-grid"}, 
          gridRows
          )
        )
      )
    }

  });
})();
