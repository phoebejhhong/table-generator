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

    render: function() {
      return (
          React.createElement("input", {
            type: "text", 
            onBlur: this.props.onSubmit, 
            onChange: this.handleChange, 
            value: this.state.cellValue}
          )
      );
    },
  });
})();
