var tableGenerator = tableGenerator || {};

(function () {

  var Table = tableGenerator.Table;
  var Output = tableGenerator.Output;
  var App = tableGenerator.App = React.createClass({

    render: function() {
      return (
        <div id="app">
          <header id="header">
            <h1>Table Generator</h1>
          </header>
          <section id ="main">
            <nav id="upper-nav">
              <a href="#">Some Menu</a>
              <a href="#">Other Menu</a>
            </nav>
              <Table />
              <Output />
          </section>
        </div>
      );
    },
  });

  React.render(
    <App/>,
    document.getElementById('app')
  );

})();
