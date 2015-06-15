var tableGenerator = tableGenerator || {};

(function () {

  var TableItem = tableGenerator.TableItem;

  var Table = tableGenerator.Table = React.createClass({displayName: "Table",

    handleEdit: function (event) {
      $parent = $(event.target).parent();
      if ($parent.hasClass("editing")) {
        $parent.removeClass("editing");
      } else {
        $parent.addClass("editing");
      }
    },

    resizeTextAreas: function() {
      $("textarea").each(function (idx, textArea) {
        debugger
        var $textArea = $(textArea),
          scrollHeight = textArea.scrollHeight - 16;
        if ($textArea.height() !== scrollHeight) {
          debugger
          $textArea.parent().siblings().andSelf().find("textarea")
          .height(scrollHeight);
        }
      });
    },

    componentDidMount: function() {
      window.addEventListener('resize', this.resizeTextAreas);
    },

    componentDidUpdate: function() {
      this.resizeTextAreas();
    },

    render: function() {
      var that = this;
      var headers = [];

      var rows = this.props.rows.map(function (row, rowIndex) {
        var cells = $.map(row, function (cell) {
          if (rowIndex == 0 && that.props.header) {
            return (
              React.createElement("th", null, 
                React.createElement(TableItem, {
                  onFocus: that.handleEdit, 
                  onBlur: that.handleEdit, 
                  onSubmit: that.props.onSubmit, 
                  cellValue: cell}
                )
              )
            );
          } else {
            return (
              React.createElement("td", null, 
              React.createElement(TableItem, {
                onFocus: that.handleEdit, 
                onBlur: that.handleEdit, 
                onSubmit: that.props.onSubmit, 
                cellValue: cell}
              )
              )
            );
          }
        });

        return (
          React.createElement("tr", null, 
            cells
          )
        );
      });

      return (
        React.createElement("table", {id: "table"}, 
          React.createElement("tbody", null, 
            rows
          )
        )
      );
    },

  });
})();
