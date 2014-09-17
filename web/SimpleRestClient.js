function SimpleRestClient(url) {

    var _url = url;

 function getByForeignKey(key, idKey) {
        var url = _url + "?"+key+"="+idKey;
       return $.ajax(
    {
        type: "GET",
        url: url,
        contentType: "application/json"        
    });
    }

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
        get : get,
        getByForeignKey:getByForeignKey
    };
}