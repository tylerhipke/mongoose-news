console.log("client webapp script loaded");

$(".btn-save").click(function() {
  var article = {};
  var current = $(this).attr("data");
  var articleID = $("#" + current);
  article.headline = articleID
    .children("div")
    .children("h5")
    .text();
  article.summary = articleID
    .children("div")
    .children("p")
    .text();
  article.url = articleID
    .children("div")
    .children("a")
    .attr("href");
  console.log(article);

  var jqxhr = $.post( "/api/add", article, function() {
	console.log( "sending" );
  })
	.done(function() {
	  console.log( "success" );
	})
	.fail(function() {
	  console.log( "error" );
	});

	
});
