var tableGenerator = tableGenerator || {};

(function () {

  var TableItem = tableGenerator.TableItem = React.createClass({
    getInitialState: function() {
      return {cellValue: this.props.cellValue};
    },

    handleChange: function(event) {
      textArea = event.target;

      // autoresize textareas on the same row
      // according to length of the contents
      $(textArea).css(
        {"height":"auto"}
      ).parent().siblings().andSelf().find("textarea")
      .height(textArea.scrollHeight - 15);

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
          <textarea
            onFocus={this.props.onFocus}
            onBlur={this.handleSubmit}
            onChange={this.handleChange}
            value={this.state.cellValue}
            rows="1"
          >
          </textarea>
      );
    },
  });
})();
