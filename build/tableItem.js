var tableGenerator = tableGenerator || {};

(function () {

  var Utils = tableGenerator.Utils;
  var TableItem = tableGenerator.TableItem = React.createClass({displayName: "TableItem",
    getInitialState: function() {
      return {cellValue: this.props.cellValue};
    },

    handleChange: function(event) {
      var textArea = event.target,
        $textArea = $(textArea),
        initialHeight = $textArea.height(),
        allTextAreasInRow = $textArea.parent().siblings().andSelf()
            .find("textarea");

      $textArea.css(
        {"height":"auto"}
      );

      // get scrollHeight "after" setting height to auto
      var scrollHeight = textArea.scrollHeight - 16;

      // autoresize textareas on the same row
      // according to length of the contents
      if (initialHeight < scrollHeight) {
        // when contents got longer lines,
        // set every cells in that row to the new scrollheight
        $textArea.parent().siblings().andSelf().find("textarea")
        .height(scrollHeight);
      } else if (initialHeight > scrollHeight) {
        // when input got lower lines,
        // set every cells' height to auto and examine the max scrollheight
        allTextAreasInRow.css(
          {"height":"auto"}
        );
        var allScrollHeights = allTextAreasInRow.map(function (idx, tA) {
          return tA.scrollHeight
        }),
        maxScrollHeight = Utils.max(allScrollHeights);

        allTextAreasInRow.height(maxScrollHeight - 16);
      } else {
        // if the number of lines didn't change,
        // just set the target height back to its initial height
        $textArea.height(initialHeight);
      }

      this.setState({
        cellValue: textArea.value
      })
    },

    handleSubmit: function(event) {
      this.props.onSubmit();
      this.props.onBlur(event);
    },

    render: function() {
      return (
          React.createElement("textarea", {
            onFocus: this.props.onFocus, 
            onBlur: this.handleSubmit, 
            onChange: this.handleChange, 
            value: this.state.cellValue, 
            rows: "1", 
            spellCheck: "false"
          }
          )
      );
    },
  });
})();
