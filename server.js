var express  = require('express');
var util = require('util');
var fs =  require('fs');

var app = express(); 
app.use(express.static(__dirname + '/web'));


function filterArray (arr, criteria) {
        return arr.filter(function(obj) {
          return Object.keys(criteria).every(function(c) {
            if (obj[c] == undefined || criteria[c] == '' || criteria[c] == null)
              return true;

            return obj[c].toString().indexOf(criteria[c].toString()) != -1;
          });
        });
      }

	function getMockBlogPosts()
	{
	    return [
	    { id: "1", name: "Blog č. 1", popis: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam rhoncus aliquam metus. Nulla non lectus sed nisl molestie malesuada. Proin mattis lacinia justo. Morbi leo mi, nonummy eget tristique non, rhoncus non leo. Nulla non arcu lacinia neque faucibus fringilla. Sed ac dolor sit amet purus malesuada congue. Fusce tellus. Pellentesque pretium lectus id turpis. Mauris tincidunt sem sed arcu. Integer vulputate sem a nibh rutrum consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Praesent vitae arcu tempor neque lacinia pretium. Sed ac dolor sit amet purus malesuada congue. Integer malesuada. Mauris tincidunt sem sed arcu. Maecenas aliquet accumsan leo. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
	    { id: "2", name: "Blog č. 1", popis: "Nulla quis diam. Fusce tellus odio, dapibus id fermentum quis, suscipit id erat. Donec ipsum massa, ullamcorper in, auctor et, scelerisque sed, est. Nam quis nulla. Duis viverra diam non justo. Pellentesque ipsum. Phasellus rhoncus. Nullam faucibus mi quis velit. Morbi scelerisque luctus velit. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Donec ipsum massa, ullamcorper in, auctor et, scelerisque sed, est. Nullam rhoncus aliquam metus. Curabitur vitae diam non enim vestibulum interdum. Quisque porta. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam bibendum elit eget erat. Etiam commodo dui eget wisi. Curabitur vitae diam non enim vestibulum interdum. " },
	    { id: "3", name: "Blog č. 1", popis: "Etiam sapien elit, consequat eget, tristique non, venenatis quis, ante. Mauris dolor felis, sagittis at, luctus sed, aliquam non, tellus. Sed vel lectus. Donec odio tempus molestie, porttitor ut, iaculis quis, sem. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Aliquam id dolor. Etiam ligula pede, sagittis quis, interdum ultricies, scelerisque eu. Etiam dictum tincidunt diam. Fusce tellus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam rhoncus aliquam metus. Aliquam ante. Mauris dictum facilisis augue. Praesent dapibus." },
	    { id: "4", name: "Blog č. 1", popis: "Pellentesque ipsum. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus. Nullam feugiat, turpis at pulvinar vulputate, erat libero tristique tellus, nec bibendum odio risus sit amet ante. Suspendisse sagittis ultrices augue. Phasellus rhoncus. Mauris elementum mauris vitae tortor. Etiam ligula pede, sagittis quis, interdum ultricies, scelerisque eu. Etiam dui sem, fermentum vitae, sagittis id, malesuada in, quam. Praesent vitae arcu tempor neque lacinia pretium. Cras elementum. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Pellentesque pretium lectus id turpis. In enim a arcu imperdiet malesuada. Integer in sapien. Quisque porta. Nunc auctor. Suspendisse nisl. Maecenas sollicitudin." }
	    ];
	}

	function getMockCommentPosts()
	{
	    return [
	    { id: "1", idBlog : "1", text: "Komentář 1"},
	    { id: "2", idBlog : "1", text: "Komentář 2"},
	    { id: "3", idBlog : "1", text: "Komentář 3"},
	    { id: "4", idBlog : "1", text: "Komentář 4"},

	    { id: "5", idBlog : "2", text: "Komentář k jinému blogu"},
	    { id: "6", idBlog : "2", text: "Komentář k jinému blogu"}
	    ];
	}

	app.get('/api/blog', function (req, res) {
		console.log(req.query);

		var blogs = getMockCommentPosts();
		blogs = filterArray(blogs, req.query)
	    res.send(blogs);
	});
	
	app.get('/api/comment:idBlog', function (req, res) {
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
	
	app.put('/api/blog', function(req, res) {
	    	    
		console.log("put: " + util.inspect(req.body));
	    res.json(true);
	});
	
	app.post('/api/blog', function(req, res) {
	    
	    console.log("post: " + util.inspect(req.body));	    
	    res.json(true);
	});
		
	app.delete('/api/blog/:id', function (req, res) {
	  console.log("delete: " + util.inspect(req.body));
	  res.json(true);
	});

	


console.log('localhost:1337/');
app.listen(1337);


