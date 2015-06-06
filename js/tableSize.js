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

    updateColNum: function() {

      var newRows = this.props.rows.map(function(row) {
        return row.slice(0, gap);
      });

      this.setState({
        rows: newRows
      });
    },

    render: function() {
      var that = this;
      var tableSizes = Utils.range(1, this.MAX_ROW_COL_NUM);

      var colOptionTags = tableSizes.map(function (size) {
        return (
          <option>
            {size}
          </option>
        )
      });

      var rowOptionTags = tableSizes.map(function (size) {
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
            {colOptionTags}
          </select>
          X
          <select
            onChange={this.updateRowNum}
            value={that.props.rows.length}>
            {rowOptionTags}
          </select>
        </span>
      )
    }

  });
})();
