/**
* Mongo Native service
*/
var mongoNativeService = require('../services/mongoNativeService.js');
var test_data = require('../exampleData/test-data');

module.exports = {
  // (Mirar si mola esto) Solo cargamos el cliente una vez y lo compartimos,
  // hacemos referencia así:
  //mongoNativeService.MongoClient
  create: function(req,res){
    console.log('M.I.K.E - POST ' + req.url);
    var teamlist = test_data.teamlist;
    console.log('M.I.K.E - team list ' + JSON.stringify(teamlist));
    mongoNativeService.teamlist("D", function(err, teamlist) {
      console.log('M.I.K.E - FLAG mongoNativeService.teamlist...');
      if (!err) {
        console.log('M.I.K.E - FLAG EL IF ERR...');
        var strTeam = "",
          i = 0;
          console.log('M.I.K.E - teamlist.count...'+ teamlist.count);
          console.log('M.I.K.E - teamlist.teams...'+ teamlist.teams);
          console.log('M.I.K.E - teamlist.teams.length...'+ teamlist.teams.length);
        for (i = 0; i < teamlist.count;) {
          for (z = 0; z < teamlist[i].teams.count;) {
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
  }
}
