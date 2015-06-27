var tableGenerator = tableGenerator || {};

(function () {
  var TableMenu = tableGenerator.TableMenu = React.createClass({

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
            <li>
              <a
                id={theme}
                href="javascript:void(0)"
                onClick={that.changeTheme}
              >
            {theme}
            </a>
            </li>
          )
        })
      );

      return (
        <ul id="table-menu">
          <li>
            <input
              type="checkbox"
              name="headerOption"
              onChange={this.toggleHeader}
              checked={this.props.header}
            />
            <span>headers on top row</span>
          </li>
          <li>
            <input
              type="checkbox"
              name="headerOption"
              onChange={this.toggleColHeader}
              checked={this.props.colHeader}
            />
            <span>headers on first column</span>
          </li>
          <li>
            <a
              href="javascript:void(0)">
            Theme
            </a>
            <ul>
              {themeLis}
            </ul>
          </li>
        </ul>
      )
    }
  })
})();
