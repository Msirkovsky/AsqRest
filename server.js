var express  = require('express');
var util = require('util');
var fs =  require('fs');

var app = express(); 
app.use(express.static(__dirname + '/web'));


	function getMockAuthor()
	{
    return { id: "1", name: "Tom", idComment:"1" }	    
	}

	function getMockBlogPosts()
	{
	    return [
	    { id: "1", name: "Blog č. 1", popis: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam rhoncus aliquam metus. Nulla non lectus sed nisl molestie malesuada. Proin mattis lacinia justo. Morbi leo mi, nonummy eget tristique non, rhoncus non leo. Nulla non arcu lacinia neque faucibus fringilla. Sed ac dolor sit amet purus malesuada congue. Fusce tellus. Pellentesque pretium lectus id turpis. Mauris tincidunt sem sed arcu. Integer vulputate sem a nibh rutrum consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Praesent vitae arcu tempor neque lacinia pretium. Sed ac dolor sit amet purus malesuada congue. Integer malesuada. Mauris tincidunt sem sed arcu. Maecenas aliquet accumsan leo. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." }
	    ];
	}

	function getMockCommentPosts()
	{
	    return [
	    { id: "1", idBlog : "1", text: "Komentář 1"}
	    ];
	}

	app.get('/api/blog', function (req, res) {
		console.log(req.query);

		var blogs = getMockBlogPosts();		
	    res.send(blogs);
	});	

		app.get('/api/author', function (req, res) {
		console.log(req.query);
		var blogs = getMockAuthor();		
	    res.send(blogs);
	});	

	app.get('/api/comment:id', function (req, res) {
		console.log(req.query);

		var data = {}
		data.blogs = getMockCommentPosts();		
	    res.send(data.blogs);
	});

	app.get('/api/comment', function (req, res) {
		console.log(req.query);

		var data = {}
		data.blogs = getMockCommentPosts();
	    res.send(data.blogs);
	});

	app.get('/api/blog:id', function(req, res) {
	    var test = getMockBlogPosts()[0];	  	    
	  res.json(test);
	});	


console.log('localhost:1337/');
app.listen(1337);


