var tableGenerator = tableGenerator || {};

(function () {

  var Utils = tableGenerator.Utils;

  var TableSize = tableGenerator.TableSize = React.createClass({displayName: "TableSize",

    MAX_ROW_COL_NUM: 12,

    updateRowNum: function(event) {
      var currentRows = this.props.rows;
      var newNum = Number(event.target.value);
      var gap = newNum - currentRows.length;

      if (gap < 0) {
        var newRows = currentRows.slice(0, gap);
      } else {
        // deep copy
        var newRows = currentRows.slice(0);
        for (var i = 0; i < gap; i++) {
          newRows.push([])
          for (var j = 0; j < currentRows[0].length; j++) {
            newRows[newRows.length - 1].push("");
          }
        }
      }
      this.props.onChange(newRows);
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
          React.createElement("option", null, 
            size
          )
        )
      });

      return (
        React.createElement("div", {id: "table-size"}, 
          React.createElement("span", null, 
            "Table Size:", 
            React.createElement("select", {
              onChange: this.updateColNum, 
              value: that.props.rows[0].length}, 
              optionTags
            ), 
            "X", 
            React.createElement("select", {
              onChange: this.updateRowNum, 
              value: that.props.rows.length}, 
              optionTags
            )
          )
        )
      )
    }

  });
})();
