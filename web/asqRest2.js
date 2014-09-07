function AsqlRestClientAutoLoader(builder) {

    var _builder = builder;
    var _logListener= null;
    var _resultObject = null;
    
    function setLogger(logListener) 
    {
        _logListener = logListener;
    }

    function load(id, nameOfRoot)
    {
        var root = getByName(nameOfRoot);
        var associationString = root["association"];
      
        //načtu root a jeho associationString
        var association = getByName(associationString);

        var rootClient = new AsqlRestClient(root.url);
        var associationClient = new AsqlRestClient(association.url);

        log("I am getting root: " + nameOfRoot);
        var promiseMain = rootClient.get(id).then(function(data)
        {
            _resultObject = data[0];
        }
        )

        log("I am getting association: " + associationString + ". Foreignt key: " + root.associationKey);

        $.when(promiseMain).then(function(data)
        {
            associationClient.getByForeignKey(root.associationKey, id).then(function(data)
            {
                _resultObject[associationString] = data;
            }
        )}
        );

        return _resultObject;
    }

    function log(message)
    {
        if (_logListener != null)
            _logListener(message);
    }

    function getByName(name)
    {
        for (var i = 0; i < _builder.data.length; i++) {
            var arrayItem = _builder.data[i];
            if (arrayItem[name] != undefined)
                return arrayItem[name];
        }
    }

      return {
        load : load,
        setLogger : setLogger     
    };

}