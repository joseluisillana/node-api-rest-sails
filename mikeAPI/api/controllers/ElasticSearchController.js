/**
* Elastic Search service.
*/
var elasticSearchService = require('../services/elasticSearchService');
var responseSchema = require('../models/responseSchema');

module.exports = {
  doping : function(req, res){
    console.log('M.I.K.E - GET ' + req.url );

    elasticSearchService.doPing(elasticSearchService.elasticsearchclient, function(err,result){
      if (!err && (result != null && result != undefined)) {
        res.status(200).send(JSON.stringify(responseSchema.createResponse(200,"OK",result)));
      }else {
        res.status(500).send(JSON.stringify(responseSchema.createResponse(500,err,[])));
      }
    });
  },
  doSearch : function(req, res){
    console.log('M.I.K.E - GET ' + req.url );
    var indexParam = req.param('indexParam');

    if (indexParam != null && indexParam != undefined){
      console.log('M.I.K.E - [[QUERYING FOR INDEX '+indexParam+']] ');
      elasticSearchService.doSearch(indexParam, elasticSearchService.elasticsearchclient, function(err,result){
        if (!err && (result != null && result != undefined)) {
          console.log('M.I.K.E - [[ QUERYING FOR INDEX '+indexParam+']] result: ' + JSON.stringify(result));
          res.status(200).send(JSON.stringify(responseSchema.createResponse(200,"OK",result)));
        }else {
          console.log('M.I.K.E - [[ ERROR QUERYING FOR INDEX '+indexParam+']] ');
          res.status(500).send(JSON.stringify(responseSchema.createResponse(500,err,[])));
        }
      });
    }else{
      console.log('M.I.K.E - [[QUERYING FOR INDEX '+indexParam+']] ');
      res.status(404).send(JSON.stringify(responseSchema.createResponse(404,'Invalid params, index param not found',[])));
    }


  }


}
