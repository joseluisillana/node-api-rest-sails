/**
* Mongo Native service
*/
var mongoNativeService = require('../services/mongoNativeService');
var responseSchema = require('../models/responseSchema');
var test_data = require('../exampleData/test-data');

module.exports = {
  // (Mirar si mola esto) Solo cargamos el cliente una vez y lo compartimos,
  // hacemos referencia así:
  //mongoNativeService.MongoClient
  findTeams: function(req,res){
    console.log('M.I.K.E - POST ' + req.url);

    mongoNativeService.teamlist('teams',"D", function(err, teamlist) {
      if (!err) {
        var strTeam = "",
          i = 0;
        for (i = 0; i < teamlist.length;) {
          for (z = 0; z < teamlist[i].count;) {
            strTeam = strTeam + "<li>" + teamlist[i].teams[z].country + "</li>";
            console.log('M.I.K.E - teamlist.teams[i].country...' + teamlist[i].teams[z].country);
            z = z + 1;
          }
          i = i + 1;
        }
        strTeam = "<ul>" + strTeam + "</ul>";
        res.status(200).send("The teams in Group " + teamlist.GroupName + " for Euro 2012 are: " + strTeam);
      } else {
        res.status(500).send("Oh dear, Database error Error details: " + JSON.stringify(err) + err);
      }
    });

  },

  find : function(req, res){
    console.log('M.I.K.E - GET ' + req.url );
    console.log('PATH PARAMS' + req.param('collection') + '___ ' +req.param('id'));

    mongoNativeService.find(req.param('collection'),req.param('id'),function(err, result) {
      if (!err && (result != null && result != undefined)) {
        res.status(200).send(JSON.stringify(responseSchema.createResponse(200,"OK",result)));
      }else {
        res.status(500).send(JSON.stringify(responseSchema.createResponse(500,err,[])));
      }
    });

  }
}
