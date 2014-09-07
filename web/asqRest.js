
function main()
{
//alert('Test');
}


main();

//hlavní funkce
function AsqlRestClient(url) {

    var _url = url;
    
    // má to tam být?
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

 function getByForeignKey(key, idKey) {

        var url = _url + "?"+key+"="+idKey;
       return $.ajax(
    {
        type: "GET",
        url: url,
        contentType: "application/json"        
    });
    }
// function get(query,id) {
        
//        return $.ajax(
//     {
//         type: "GET",
//         url: _url,
//         contentType: "application/json",
//         data:  id
//     });

// }
 function get(id) {
        
    var url = _url + "?id="+id;
    return $.ajax(
    {
        type: "GET",
        url: url,
        contentType: "application/json"        
    });
    }

    return {
        post : post,
        get : get,
        getByForeignKey:getByForeignKey
    };

}
