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
  doSearch: function(index,client){
   client.search({
     q: 'pants'
   }).then(function (body) {
     var hits = body.hits.hits;
   }, function (error) {
     console.trace(error.message);
   });
  },
  doComplexSearch: function(index,type,body,client){
   client.search({
     index: 'twitter',
     type: 'tweets',
     body: {
       query: {
         match: {
           body: 'elasticsearch'
         }
       }
     }
   }).then(function (resp) {
     var hits = resp.hits.hits;
   }, function (err) {
     console.trace(err.message);
   });
  }
}
