/**
* Elastic Search service.
*/
var kafkapipeService = require('../services/kafkapipeservice');
var responseSchema = require('../models/responseSchema');

module.exports = {
  putMessageOnTopic : function(req, res){
    console.log('M.I.K.E - POST ' + req.url );
    var topicParam = req.param('topic');
    var bodyParam = JSON.stringify(req.body);


    if ((topicParam != null && topicParam != undefined)&&(bodyParam != null && bodyParam != undefined)){
      console.log('M.I.K.E - [[ PUTTING ON TOPIC: '+topicParam+']] ');
      kafkapipeService.putMessageOnTopic(topicParam, bodyParam, kafkapipeService.kafkapipeclient, kafkapipeService.kafkapipeproducer, function(err,result){
        if (!err && (result != null && result != undefined)) {
          console.log('M.I.K.E - [[ PUTTING ON TOPIC: '+topicParam+']] The value: '+bodyParam+']] result: ' + JSON.stringify(result));
          res.status(200).send(JSON.stringify(responseSchema.createResponse(200,"OK",result)));
        }else {
          console.log('M.I.K.E - [[ ERROR PUTTING ON TOPIC: '+topicParam+']] The value: '+bodyParam+']] ');
          res.status(500).send(JSON.stringify(responseSchema.createResponse(500,err,[])));
        }
      });
    }else{
      console.log('M.I.K.E - [[PUTTING ON TOPIC: '+topicParam+']] The value: '+bodyParam+']] ');
      res.status(404).send(JSON.stringify(responseSchema.createResponse(404,'Invalid params, params not found',[])));
    }
  }
}
