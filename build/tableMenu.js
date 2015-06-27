var tableGenerator = tableGenerator || {};

(function () {
  var TableMenu = tableGenerator.TableMenu = React.createClass({displayName: "TableMenu",

    THEMES: [
      'base16_ocean_dark',
      'base16_ocean_light',
    ],

    toggleHeader: function() {
      this.props.onChange({
        header: !this.props.header
      });
    },

    toggleColHeader: function() {
      var that = this;
      this.props.onChange({
        colHeader: !that.props.colHeader
      });
    },

    changeTheme: function(event) {
      var targetTheme = event.target.id,
        oldCssFileName = "css/" + this.props.currentTheme + ".css",
        newCssFileName = "css/" + targetTheme + ".css",
        oldLink = $("link[href='" + oldCssFileName +"']");

      oldLink.attr('href', newCssFileName);
      this.props.onChange({
        currentTheme: targetTheme
      });
    },

    render: function() {
      var that = this;
      var themeLis = (
        this.THEMES.map(function (theme) {
          return (
            React.createElement("li", null, 
              React.createElement("a", {
                id: theme, 
                href: "javascript:void(0)", 
                onClick: that.changeTheme
              }, 
            theme
            )
            )
          )
        })
      );

      return (
        React.createElement("ul", {id: "table-menu"}, 
          React.createElement("li", null, 
            React.createElement("input", {
              type: "checkbox", 
              name: "headerOption", 
              onChange: this.toggleHeader, 
              checked: this.props.header}
            ), 
            React.createElement("span", null, "headers on top row")
          ), 
          React.createElement("li", null, 
            React.createElement("input", {
              type: "checkbox", 
              name: "headerOption", 
              onChange: this.toggleColHeader, 
              checked: this.props.colHeader}
            ), 
            React.createElement("span", null, "headers on first column")
          ), 
          React.createElement("li", null, 
            React.createElement("a", {
              href: "javascript:void(0)"}, 
            "Theme"
            ), 
            React.createElement("ul", null, 
              themeLis
            )
          )
        )
      )
    }
  })
})();
