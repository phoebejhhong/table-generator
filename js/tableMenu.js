var tableGenerator = tableGenerator || {};

(function () {
  tableGenerator.TableMenu = React.createClass({

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
        newCssFileName = "css/" + targetTheme + ".css",
        targetLink = $("link[href='" + newCssFileName +"']");

      $("link.theme").attr("disabled", true);
      $(targetLink).attr("disabled", false);

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
            <li>
              <a
                id={theme}
                href="javascript:void(0)"
                onClick={that.changeTheme}
                className={that.props.currentTheme == theme ? "checked" : ""}
              >
              {theme}
              </a>
            </li>
          )
        })
      );

      return (
        <div
          id="table-menu"
          className="nav-item"
        >
          <a href="javascript:void(0)"
            onClick={this.props.onClick}
          >
          Table
          <i
            className="material-icons">
            &#xE5C5;
          </i>
          </a>
          <ul
            className="dropdown hidden"
            id="table-dropdown"
            >
            <li>
              <a
              href="javascript:void(0)"
              >
                Add Title
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                onClick={this.toggleHeader}
                className={this.props.header ? "checked" : ""}
              >
                Headers on top row
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                onClick={this.toggleColHeader}
                className={this.props.colHeader ? "checked" : ""}
              >
                Headers on first column
              </a>
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
        </div>
      )
    }
  })
})();
