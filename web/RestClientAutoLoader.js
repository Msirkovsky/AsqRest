function RestClientAutoLoader(builder) {

    var _builder = builder;
    var _logListener= null;
    var _resultObject = null;
    var _callbackAfterAllLoaded;
    var _numberOfActiveAsyncRequest = 0;
    var _numberOfAllAsyncRequest = 0;

    function setLogger(logListener) 
    {
        _logListener = logListener;
    }

    function load(id, nameOfRoot, callbackAfterAllLoaded)
    {
        _callbackAfterAllLoaded = callbackAfterAllLoaded;
        var root = getRelationConfigurationByName(nameOfRoot);
        var rootClient = new SimpleRestClient(root.url);
        
        log("I am getting root: " + nameOfRoot);
        _numberOfAllAsyncRequest++;
        var promiseMain = rootClient.get(id).then(function(data)
        {
            log("I am done getting root: " + nameOfRoot);
            _resultObject = data[0];
        }
        );
        
        var relations = root["relations"];
        
        for (var index = 0; index < relations.length; index++) {        
            processRelations(relations[index], id, promiseMain);      
        }
        return _resultObject;
    }


    function processRelations(relation, id, promiseParent)
    {
        var association = getRelationConfigurationByName(relation.type);
        var associationClient = new SimpleRestClient(association.url);

        log("I am getting association: " + relation.name + ". Foreignt key: " + relation.key);

        $.when(promiseParent).then(function(data)
        {
            _numberOfActiveAsyncRequest++;
            _numberOfAllAsyncRequest++;

            associationClient.getByForeignKey(relation.key, id).then(function(data)
            {
                log("I am done getting relation: " + relation.name);
                _numberOfActiveAsyncRequest--;

                if (relation.relation == "c")
                {
                    _resultObject[relation.name] = data;
                    if (Array.isArray(data))
                    {
                        processArray(data, relation.type);
                    }
                    else
                    {
                        processSingleItem(data, relation.type);
                    }
                }

                if (_numberOfActiveAsyncRequest == 0)
                {
                    log("Number of complete requests: " + _numberOfAllAsyncRequest + ".");
                    log("All completed.");
                    _callbackAfterAllLoaded(_resultObject);
                }
            }
        )}
        );
    }

    function processArray(data, type)  {
        var relationInstance = getRelationConfigurationByName(type);

        if (relationInstance == null)
        {
            throw "Not mapped: " + type +". Cant process!";
        }

        for (var index = 0; index < data.length; index++) {
            
            var relations = relationInstance.relations;
            if (relations == undefined)
                return;
            
             for (var j = 0; j < relations.length; j++) {        
                processRelations(relations[j], data[index].id, null);
            }            
        }
    }

    function processSingleItem(data, type) {

        var relationInstance = getRelationConfigurationByName(type);

        if (relationInstance == null)
        {
            throw "Not mapped: " + type +". Cant process!";
        }
        var relations = relationInstance.relations;
        if (relations == undefined)
            return;
        
         for (var j = 0; j < relations.length; j++) {        
            processRelations(relations[j], data.id, null);
        }            
    }

    function log(message)
    {
        if (_logListener != null)
            _logListener(message);
    }

    function getRelationConfigurationByName(name)
    {
        for (var i = 0; i < _builder.data.length; i++) {
            var arrayItem = _builder.data[i];
            if (arrayItem[name] != undefined)
                return arrayItem[name];
        }
        return null;
    }
      return {
        load : load,
        setLogger : setLogger     
    };
}