function main() {

    var builder = {
        data: [
        {author : { name : 'author', url: 'api/author' }},
        {comment : { name : 'comment', url: 'api/comment', relations : [{ name : "author", type:"author", key:"idComment", relation: 'a'}] }},
        {blog : { name : 'blog', url: 'api/blog', relations : [{ name: "comments", type:"comment", key:"idBlog", relation: 'c'}]}}
        ]
    };

    var div = document.getElementById("viewDiv");
    div.innerHTML = "test";
    
    function addResultBold(text)
    {
       div.innerHTML = div.innerHTML + "<br/><b>" + text + '</b>';
    }

    function addResult(text)
    {
       div.innerHTML = div.innerHTML + "<br/>" + text;
    }

    var autoLoader = new AsqlRestClientAutoLoader(builder);
    autoLoader.setLogger(addResult);
    var completeEntity = autoLoader.load(1,'blog');


    div.innerHTML = div.innerHTML + "<br/>test GET";

    var client = new AsqlRestClient('api/blog');
    var promise = client.post({"data":"test"});
    promise.done(function (data) {
        addResultBold("AsqlRestClient - test GET  - ok");
    }).fail(function () {
        addResultBold("AsqlRestClient - test GET  - error");
    });

    promise = client.get({"id": "1"});
    promise.done(function (data) {
        addResultBold("AsqlRestClient - test GET  - ok");
    }).fail(function () {
        addResultBold("AsqlRestClient - test GET  - error");
    });

}

function oldRequests()
{

     $.ajax("api/blog")
        .done(function(data) {
            addResult("test GET - ok");
        })
        .fail(function() {
            addResult("test GET - error");
        });
    
    $.ajax(
        {
            type: "POST",
            url: "api/blog",
            contentType: "application/json",
            data: { "data": "mydata" }
        })
        .done(function(data) {
            addResult("test POST ok");
        })
        .fail(function() {
            addResult("test POST error");
        });



    $.ajax(
        {
            type: "PUT",
            url: "api/blog",
            contentType: "application/json",
            data: { "data": "mydata" }
        })
        .done(function(data) {
            addResult("test PUT - ok");
        })
        .fail(function() {
            addResult("test PUT - error");
        });

    

    $.ajax(
        {
            type: "DELETE",
            url: "api/blog",
            contentType: "application/json",
            data: { "data": "mydata" }
        })
        .done(function(data) {            
            addResult("test DELETE - ok");
        })
        .fail(function() {
            addResult("test DELETE - error");
        });

}