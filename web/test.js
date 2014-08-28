function main() {
    var div = document.getElementById("viewDiv");
    div.innerHTML = "test";

    div.innerHTML = div.innerHTML + "<br/>test GET";

    function addResult(text)
    {
       div.innerHTML = div.innerHTML + "<br/>" + text;
    }

        function addResultBold(text)
    {
       div.innerHTML = div.innerHTML + "<br/><b>" + text + '</b>';
    }

    var client = new AsqlRestClient('api/blog');
    var promise = client.post({"data":"test"});
    promise.done(function (data) {
        addResultBold("AsqlRestClient - test GET  - ok");
    }).fail(function () {
        addResultBold("AsqlRestClient - test GET  - error");
    });


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

