/*
  Cargamos el cliente de MongoDB Nativo
*/

// URL
var urlLong = 'mongodb://10.211.55.112:27017/restexample';
var host = '10.211.55.112';
var port = 27017;
var database = 'restexample';

var collectionName = 'teams';

var mongo = require('mongodb'),
  Server = mongo.Server,
  Db = mongo.Db;

var server = new Server(host, port, {
  auto_reconnect: true
});

var db = new Db(database, server);

var onErr = function(err, callback) {
  console.log('M.I.K.E - [[ERROR]] : '+JSON.stringify(err));
  db.close();
  callback(err);
};


/**
 * Let's make our Mongodb Schemas/Models
 */
 module.exports = {
   teamlist : function(gname, callback) {
    db.open(function(err, db) {
      if (!err) {
        db.collection('teams', function(err, collection) {
          console.log('M.I.K.E - VAMOSSSSS... 1 ' + collection);
          if (!err) {
            console.log('M.I.K.E - VAMOSSSSS... 2 ' + collection);
            collection.find({
              'GroupName': gname
            }).toArray(function(err, docs) {
              if (!err) {
                console.log('M.I.K.E - [[llego?]] : ');
                db.close();
                var intCount = docs.length;
                if (intCount > 0) {
                  var strJson = "";
                  for (var i = 0; i < intCount;) {
                    var intTeamsCount = docs[i].teams.length;
                    for (var z = 0; z < intTeamsCount;) {
                      strJson += '{"country":"' + docs[i].teams[z].country + '"}'
                      z = z + 1;
                      if (z < intTeamsCount) {
                        strJson += ',';
                      }
                    }
                    i = i + 1;
                    if (i < intCount) {
                      strJson += ',';
                    }
                  }
                  strJson = '{"GroupName":"' + gname + '","count":' + intCount + ',"teams":[' + strJson + "]}"
                  console.log('M.I.K.E - [[strJson]] : ' + strJson);
                  callback("", JSON.parse(strJson));
                }
              } else {
                console.log('M.I.K.E - [[ERROR]] : '+err);
                onErr(err, callback);
              }
            }); //end collection.find
          } else {
            console.log('M.I.K.E - [[ERROR]] : '+err);
            onErr(err, callback);
          }
        }); //end db.collection
      } else {
        console.log('M.I.K.E - [[ERROR]] : '+err);
        onErr(err, callback);
      }
    });
  }
 }
