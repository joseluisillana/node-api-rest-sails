/**
* Mongo Native service
*/
var mongoNativeService = require('../services/mongoNativeService.js');
var test_data = require('../exampleData/test-data');

module.exports = {
  // (Mirar si mola esto) Solo cargamos el cliente una vez y lo compartimos,
  // hacemos referencia así:
  //mongoNativeService.MongoClient
  findTeams: function(req,res){
    console.log('M.I.K.E - POST ' + req.url);

    mongoNativeService.teamlist('teams',"D", function(err, teamlist) {
      console.log('M.I.K.E - FLAG mongoNativeService.teamlist...');
      if (!err) {
        console.log('M.I.K.E - FLAG EL IF ERR...');
        var strTeam = "",
          i = 0;
          console.log('M.I.K.E - teamlist'+ JSON.stringify(teamlist));

        for (i = 0; i < teamlist.length;) {
          for (z = 0; z < teamlist[i].count;) {
            strTeam = strTeam + "<li>" + teamlist[i].teams[z].country + "</li>";
            console.log('M.I.K.E - teamlist.teams[i].country...' + teamlist[i].teams[z].country);
            z = z + 1;
          }
          i = i + 1;
        }
        strTeam = "<ul>" + strTeam + "</ul>";
        /*res.writeHead(200, {
          'Content-Type': 'text/html'
        });
        res.write(template.build("Test web page on node.js", "Hello there", "<p>The teams in Group " + teamlist.GroupName + " for Euro 2012 are:</p>" + strTeam));
        res.end();
        */
        res.status(200).send("The teams in Group " + teamlist.GroupName + " for Euro 2012 are: " + strTeam);
      } else {
          console.log('M.I.K.E - FLAG EL ELSE...');
        /*res.writeHead(200, {
          'Content-Type': 'text/html'
        });*/
        /*res.write(template.build("Oh dear", "Database error", "<p>Error details: " + err + "</p>"));
        res.end();*/
        res.status(500).send("Oh dear, Database error Error details: " + JSON.stringify(err) + err);
      }
    });
    //res.status(200).send("Psss a saber");
  },

  find : function(req, res){
    console.log('M.I.K.E - GET ' + req.url );



    console.log('PATH PARAMS' + req.param('collection') + '___ ' +req.param('id'));

    mongoNativeService.find(req.param('collection'),req.param('id'),function(err, result) {
      if (!err && (result != null && result != undefined)) {
        var responseRest = {
          status: 200,
          statusMessage: "OK",
          resultMessage: result
        };
        res.status(200).send(JSON.stringify(responseRest));
      }else {
        var responseRest = {
          status: 500,
          statusMessage: err,
          resultMessage: []
        };
        //res.status(500).send("Oh dear, Database error Error details: " + JSON.stringify(err) + err);
        res.status(500).send(JSON.stringify(responseRest));
      }
    });

    // Salida por defecto
    //return res.status(200).send("ok");
  }
}
