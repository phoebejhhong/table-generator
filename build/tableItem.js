var tableGenerator = tableGenerator || {};

(function () {

  var TableItem = tableGenerator.TableItem = React.createClass({displayName: "TableItem",
    getInitialState: function() {
      return {cellValue: this.props.cellValue};
    },

    handleChange: function(event) {
      this.setState({
        cellValue: event.target.value
      })
    },

    handleSubmit: function(event) {
      this.props.onSubmit();
      this.props.onBlur(event);
    },

    render: function() {
      return (
          React.createElement("input", {
            type: "text", 
            onFocus: this.props.onFocus, 
            onBlur: this.handleSubmit, 
            onChange: this.handleChange, 
            value: this.state.cellValue}
          )
      );
    },
  });
})();
