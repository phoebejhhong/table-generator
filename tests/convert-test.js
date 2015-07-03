module('Conversion test', {
  setup: function() {
    this.rows =[
      ['Monday', 'Friday'],
      ['Math', 'English']
    ]
  }
});

test('convert to HTML', function() {
  var convertedToHTML = tableGenerator.Convert.toHTMLTags(this.rows, true);
  var expectedResult = "<table>" +
    "\n\t<tbody>" +
      "\n\t\t<tr>" +
        "\n\t\t\t<th>Monday</th>" +
        "\n\t\t\t<th>Friday</th>" +
      "\n\t\t</tr>" +
      "\n\t\t<tr>" +
        "\n\t\t\t<td>Math</td>" +
        "\n\t\t\t<td>English</td>" +
      "\n\t\t</tr>" +
    "\n\t</tbody>" +
  "\n</table>";

  equal(convertedToHTML, expectedResult);
});

test("convert to JSON", function() {
  var convertedToJSON = tableGenerator.Convert.toJSON(this.rows, true);
  var expectedResult = '[{"Monday":"Math","Friday":"English"}]'

  equal(convertedToJSON, expectedResult);
});

test('convert to Markdown', function() {
  var convertedToMarkdown = tableGenerator.Convert.toMarkdown(this.rows, true);
  var expectedResult = "|Monday|Friday|" +
    "\n|---|---|" +
    "\n|Math|English|\n";

  equal(convertedToMarkdown, expectedResult);
});
