
function main()
{
//alert('Test');
}


main();

//hlavn� funkce
function AsqlRestClient(url) {

    var _url = url;
    
    // m� to tam b�t?
    var genericError =null;
    function registerGenericError(errorCallback)
    {
        genericError = errorCallback;
    }
    //???????????????????

    function then(done)
    {


    }  

    function post(data) {
        
       return $.ajax(
    {
        type: "POST",
        url: _url,
        contentType: "application/json",
        data:  data
    })
    }


function get(query,id) {
        
       return $.ajax(
    {
        type: "GET",
        url: _url,
        contentType: "application/json",
        data:  id
    });

}
 function get(id) {
        
       return $.ajax(
    {
        type: "GET",
        url: _url,
        contentType: "application/json",
        data:  id
    });
    }

    return {
        post : post,
        get : get
    };

}
