var tableGenerator = tableGenerator || {};

(function () {
  tableGenerator.TableMenu = React.createClass({displayName: "TableMenu",

    THEMES: [
      'base16_ocean_dark',
      'base16_ocean_light',
    ],

    toggleHeader: function() {
    this.props.onChange({
        header: !this.props.header
      });

      // close dropdown
      this.props.onSubmit();
    },

    toggleColHeader: function() {
      var that = this;
      this.props.onChange({
        colHeader: !that.props.colHeader
      });

      // close dropdown
      this.props.onSubmit();
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

      // close dropdown
      this.props.onSubmit();
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
                onClick: that.changeTheme, 
                className: that.props.currentTheme == theme ? "checked" : ""
              }, 
              theme
              )
            )
          )
        })
      );

      return (
        React.createElement("div", {
          id: "table-menu", 
          className: "nav-item"
        }, 
          React.createElement("a", {href: "javascript:void(0)", 
            onClick: this.props.onClick
          }, 
          "Table", 
          React.createElement("i", {
            className: "material-icons"}, 
            ""
          )
          ), 
          React.createElement("ul", {
            className: "dropdown hidden", 
            id: "table-dropdown"
            }, 
            React.createElement("li", null, 
              React.createElement("a", {
                href: "javascript:void(0)", 
                onClick: this.toggleHeader, 
                className: this.props.header ? "checked" : ""
              }, 
                "Headers on top row"
              )
            ), 
            React.createElement("li", null, 
              React.createElement("a", {
                href: "javascript:void(0)", 
                onClick: this.toggleColHeader, 
                className: this.props.colHeader ? "checked" : ""
              }, 
                "Headers on first column"
              )
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
      )
    }
  })
})();
