var tableGenerator = tableGenerator || {};

(function () {
  var TableSize = tableGenerator.TableSize,
    TableMenu = tableGenerator.TableMenu;

  tableGenerator.UpperNav = React.createClass({

    getInitialState: function() {
      return {currentMenuIdx: null}
    },

    // open specific menu
    openDropdown: function (menu, menuIdx) {
      menu.className += " open";
      this.setState({
        currentMenuIdx: menuIdx
      });
    },

    // close current menu
    closeDropdown: function () {
      var currentMenu = $(".nav-item")[this.state.currentMenuIdx];
      $(currentMenu).removeClass("open");
      this.setState({
        currentMenuIdx: null
      });
    },

    toggleDropdown: function (event) {

      var currentIdx = this.state.currentMenuIdx,
        targetMenu = $(event.target).parents(".nav-item")[0],
        targetIdx = $(".nav-item").index(targetMenu);

      if (currentIdx !== null) {
        this.closeDropdown();

        if (currentIdx !== targetIdx) {
          this.openDropdown(targetMenu, targetIdx);
        }
      } else {
        this.openDropdown(targetMenu, targetIdx);
      }
    },

    render: function() {
      return (
        <nav id="upper-nav">
          <TableSize
            {...this.props}
            onClick={this.toggleDropdown}
            onSubmit={this.closeDropdown}
          />
          <TableMenu
            {...this.props}
            onClick={this.toggleDropdown}
            onSubmit={this.closeDropdown}
          />
        </nav>
      )
    }
  });

})();
