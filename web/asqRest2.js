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
        var root = getRelationConfigurationByName(nameOfRoot);
        var rootClient = new AsqlRestClient(root.url);
        

        log("I am getting root: " + nameOfRoot);
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
        var associationClient = new AsqlRestClient(association.url);

        log("I am getting association: " + relation.name + ". Foreignt key: " + relation.key);

        $.when(promiseParent).then(function(data)
        {
            associationClient.getByForeignKey(relation.key, id).then(function(data)
            {
                log("I am done getting association: " + relation.name);                
                _resultObject[relation.name] = data;
                if (Array.isArray(data))
                {
                    processArray(data, relation.type);
                }
                else
                {
                    processSingleItem(data, relation);
                }                
            }
        )}
        );
    }

    function processArray(data, type)  {
        var relationInstance = getRelationConfigurationByName(type);

        for (var index = 0; index < data.length; index++) {
            
            var relations = getRelationConfigurationByName(type).relations;
            
             for (var j = 0; j < relations.length; j++) {        
                processRelations(relations[j], data[index].id, null);
            }            
        }
    }

    function processSingleItem(data, relation) {
        var obj = getRelationConfigurationByName(nameOfRoot);
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
    }
      return {
        load : load,
        setLogger : setLogger     
    };
}