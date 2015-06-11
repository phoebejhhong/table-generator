var tableGenerator = tableGenerator || {};

(function () {

  var TABLE_WIDTH = 800,
    CELL_HEIGHT = 50,
    BORDER = 3,
    COLORS = {
      "oceanDark": {
        cell: "#2b303b",
        background: "#4f5b66",
        header: "#a7adba",
        text: "#a3be8c",
      },
    };

  var Canvas = tableGenerator.Canvas = React.createClass({displayName: "Canvas",

    draw: function(options) {
      // TODO: definitely refactor this !!

      var rows = this.props.rows,
       theme = options.theme || "oceanDark",
       colors = COLORS[theme],
       headers = options.headers || true,

       rowNum = rows.length,
       colNum = rows[0].length,

       height = (CELL_HEIGHT + BORDER) * rows.length + BORDER,
       cellWidth = (TABLE_WIDTH - (BORDER + 1) * colNum) / colNum * 1.0,
       canvas = document.getElementById("canvas");

      if (canvas.getContext){
        var ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.fillStyle = colors.background;
        ctx.fillRect (0, 0, TABLE_WIDTH, height);
        ctx.closePath();

        for (var row = 0; row < rowNum; row++) {
          var y = (CELL_HEIGHT + BORDER) * row;

          for (var col = 0; col < colNum; col++) {

            var x = (cellWidth + BORDER) * col;

            if (headers && row === 0) {
              var cellColor = colors.header,
                textColor = colors.cell;
            } else {
              var cellColor = colors.cell,
                textColor = colors.text;
            }

            ctx.beginPath();
            ctx.fillStyle = cellColor;
            ctx.fillRect(x + BORDER, y + BORDER, cellWidth, CELL_HEIGHT);
            ctx.closePath();

            ctx.beginPath();
            ctx.font = "normal 12pt 'Open Sans' sans-serif";
            ctx.fillStyle = textColor;
            ctx.fillText(rows[row][col], x + 10, y + CELL_HEIGHT * 2 /3);
            ctx.closePath();
          };
        };
      };
    },

    componentDidMount: function() {
      this.draw({});
    },

    componentDidUpdate: function() {
      this.draw({});
    },

    render: function() {
      var width = TABLE_WIDTH;
      var height = (CELL_HEIGHT + (BORDER + 1)) * this.props.rows.length + BORDER;

      return (
        React.createElement("canvas", {
          width: width, 
          height: height, 
          id: "canvas"}
        )
    );
    },
  });
})();
