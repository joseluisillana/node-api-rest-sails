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
  }
}
