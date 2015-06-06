var tableGenerator = tableGenerator || {};

(function () {

  var Utils = tableGenerator.Utils;

  var TableSize = tableGenerator.TableSize = React.createClass({

    MAX_ROW_COL_NUM: 12,

    updateRowNum: function(event) {
      var currentRows = this.props.rows;
      var newNum = Number(event.target.value);
      var gap = newNum - currentRows.length;

      if (gap < 0) {
        this.props.onChange(currentRows.slice(0, gap));
      } else {
        var newRow = [];
        for (var i = 0; i < currentRows[0].length; i++) {
          newRow[i] = "";
        }
        for (var i = 0; i < gap; i++) {
          currentRows.push(newRow);
        }

        this.props.onChange(currentRows);
      }
    },

    updateColNum: function(event) {
      var currentRows = this.props.rows;
      var newNum = Number(event.target.value);
      var gap = newNum - currentRows[0].length;
      
      if (gap < 0) {
        var newRows = currentRows.map(function (row) {
          return row.slice(0, gap);
        });
      } else {
        var newRows = currentRows.map(function (row) {
          for (var i = 0; i < gap; i++) {
            row.push("");
          }
          return row
        });
      }

      this.props.onChange(newRows);
    },

    render: function() {
      var that = this;
      var tableSizes = Utils.range(1, this.MAX_ROW_COL_NUM);

      var optionTags = tableSizes.map(function (size) {
        return (
          <option>
            {size}
          </option>
        )
      });

      return (
        <span>
          Table Size:
          <select
            onChange={this.updateColNum}
            value={that.props.rows[0].length}>
            {optionTags}
          </select>
          X
          <select
            onChange={this.updateRowNum}
            value={that.props.rows.length}>
            {optionTags}
          </select>
        </span>
      )
    }

  });
})();
