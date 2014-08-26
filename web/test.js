function main()
{
	var div = document.getElementById("viewDiv");
	div.innerHTML  ="test";   


div.innerHTML  = div.innerHTML + "<br/>test GET";   
$.ajax("api/blog")
  .done(function(data) {
    alert( data );
  })
  .fail(function() {
    alert( "error" );
  });

div.innerHTML  = div.innerHTML + "<br/>test POST";
$.ajax(
	{
		type: "POST",
		url:"api/blog",
		contentType: "application/json",
		data: {"data": "mydata"}
})
  .done(function(data) {
    alert( data );
  })
  .fail(function() {
    alert( "error" );
  });

div.innerHTML  = div.innerHTML + "<br/>test PUT";
$.ajax(
	{
		type: "PUT",
		url:"api/blog",
		contentType: "application/json",
		data: {"data": "mydata"}
})
  .done(function(data) {
    alert( data );
  })
  .fail(function() {
    alert( "error" );
  });

//	div.innerHTML  = div.innerHTML + "<br/>test DELETE";
}

