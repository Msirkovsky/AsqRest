function AsqlRestClientAutoLoader(builder) {

    var _builder = builder;

    function load(id, nameOfRoot)
    {
        var root = getByName(nameOfRoot);
        var associationString = root["association"];

        //var association = root[associationString];

        //načtu root a jeho associationString
        var association = getByName(associationString);

        var rootClient = new AsqlRestClient(root.url);
        var associationClient = new AsqlRestClient(association.url);
        rootClient.get(id);
        associationClient.get(association.associationKey, id);

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
        load : load      
    };

}