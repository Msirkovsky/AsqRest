
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

    return {
        post : post
    };

}