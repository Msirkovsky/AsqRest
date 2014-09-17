function main() {

    var builder = {
        data: [
        {authorDetail : { name : 'authorDetail', url: 'api/authorDetail' }},
        {author : { name : 'author', url: 'api/author', relations : [{ name: "authorDetail", type:"authorDetail", key:"idAuthor", relation: 'c'}] }},
        {comment : { name : 'comment', url: 'api/comment', relations : [{ name : "author", type:"author", key:"idComment", relation: 'a'}] }},
        {blog : { name : 'blog', url: 'api/blog', relations : [{ name: "comments", type:"comment", key:"idBlog", relation: 'c'}]}}
        ]
    };

    var div = document.getElementById("viewDiv");
    addResultBold("RestClientAutoLoader<br/>");
        
    function addResultBold(text)
    {
       div.innerHTML = div.innerHTML + "<br/><b>" + text + '</b>';
    }

    function addResult(text)
    {
       div.innerHTML = div.innerHTML + "<br/>" + text;
    }

    var autoLoader = new RestClientAutoLoader(builder);
    autoLoader.setLogger(addResult);
    var completeEntity = autoLoader.load(1,'blog', function(loadedObj) {
          addResult("Object complete loaded.");
        });
}