/**
 * We load elasticsearch
 */
 var elasticsearch = require('elasticsearch');
 var client = new elasticsearch.Client({
   host: 'localhost:9200',
   log: 'trace'
 });


module.exports = {
  elasticsearch : elasticsearch,
  elasticsearchclient: client,
  doPing: function(client, callback){
   client.ping({
     // ping usually has a 3000ms timeout
     requestTimeout: Infinity,
     // undocumented params are appended to the query string
     hello: "elasticsearch!"
   }, function (error) {
     if (error) {
       console.trace('elasticsearch cluster is down!');
       callback("", JSON.parse(error));
     } else {
       console.log('All is well');
       callback("", 'All is well');
     }
   });
  },
  doSearch: function(indexParam,client,callback){
    var searchParams = {
      index: '' + indexParam
    };
    // Check if indices exists
    client.indices.exists(searchParams, function(error, exists) {
      console.log('Existe?: ' + exists);
      if (exists === true) {
        client.search(searchParams).then(function (body) {
          var hits = body.hits.hits;
          callback("", body);
        }, function (error) {
          console.log(error.message);
          callback("", JSON.parse(error));
        });
      } else if (error != null && error != undefined){
        console.log(error);
        callback("", JSON.parse(error));
      }else{
        console.log("ERROR No existe el indice");
        callback("ERROR No existe el indice", "ERROR No existe el indice");
      }
    });
  },
  doComplexSearch: function(indexParam,typeParam,bodyParam,client){
   client.search({
     index: indexParam,
     type: typeParam,
     body: {
       query: {
         match: {
           body: body
         }
       }
     }
   }).then(function (resp) {
     var hits = resp.hits.hits;
     callback("", resp);
   }, function (err) {
     console.trace(err.message);
     callback("", JSON.parse(error));
   });
  }
}
