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
  console.log('M.I.K.E - [[ ERROR ]] : '+JSON.stringify(err));
  db.close();
  callback(err);
};


/**
 * Let's make our Mongodb Schemas/Models
 */
 module.exports = {
   teamlist : function(collectionName, gname, callback) {
    db.open(function(err, db) {
      if (!err) {
        db.collection(collectionName, function(err, collection) {
          if (!err) {
            collection.find({
              'GroupName': gname
            }).toArray(function(err, docs) {
              if (!err) {
                db.close();
                var intCount = docs.length;
                console.log('M.I.K.E - [[ Collection '+collectionName+' ]] total results : ' + intCount);
                if (intCount > 0) {
                  var strJson = "[";
                  for (var i = 0; i < intCount;) {
                    console.log(docs[i]);
                    var intTeamsCount = docs[i].teams.length;
                    console.log('M.I.K.E - [[ Collection '+collectionName+' , registry '+i+' ]] total teams : ' + intTeamsCount);
                    strJson += '{"GroupName":"' + gname + '","count":' + intTeamsCount + ',"teams":[';
                    for (var z = 0; z < intTeamsCount;) {
                      strJson += '{"country":"' + docs[i].teams[z].country + '"}'
                      z = z + 1;
                      if (z < intTeamsCount) {
                        strJson += ',';
                      }
                    }
                    strJson += "]}";
                    i = i + 1;
                    if (i < intCount) {
                      strJson += ',';
                    }
                  }
                  strJson += "]";

                  console.log('M.I.K.E - [[ RESULT ]] : ' + strJson);
                  callback("", JSON.parse(strJson));
                }
              } else {
                console.log('M.I.K.E - [[ ERROR ]] : '+err);
                onErr(err, callback);
              }
            }); //end collection.find
          } else {
            console.log('M.I.K.E - [[ ERROR ]] : '+err);
            onErr(err, callback);
          }
        }); //end db.collection
      } else {
        console.log('M.I.K.E - [[ ERROR ]] : '+err);
        onErr(err, callback);
      }
    });
  },

  find : function(collectionName, id, callback) {
   db.open(function(err, db) {
     if (!err) {

       db.collection(collectionName, function(err, collection) {
         console.log('M.I.K.E - [[QUERYING FOR '+collectionName+']]');
         if (!err) {
           console.log('M.I.K.E - [[QUERYING FOR '+collectionName+']] with field id = '+ id);
           collection.find({
             '_id': new mongo.ObjectID(id)
           }).toArray(function(err, docs) {
             if (!err) {
               // Cerramos la conexión, ya no la necesitamos
               db.close();
               var intCount = docs.length;
               console.log('M.I.K.E - [[Collection '+collectionName+']] total results received : ' + intCount);
               if (intCount>0){
                 console.log('M.I.K.E - [[ Data from MongoDB ]] : ' + docs);

                 // TODO Intento de devolver los resultados a pelo
                 callback("", docs);
               }else{
                 // TODO Intento de devolver los resultados a pelo
                 console.log('M.I.K.E - [[ Data from MongoDB ]] : EMPTY');
                 callback("", []);
               }
             } else {
               console.log('M.I.K.E - [[ ERROR ]] : '+err);
               onErr(err, callback);
             }
           }); //end collection.find
         } else {
           console.log('M.I.K.E - [[ ERROR ]] : '+err);
           onErr(err, callback);
         }
       }); //end db.collection
     } else {
       console.log('M.I.K.E - [[ ERROR ]] : '+err);
       onErr(err, callback);
     }
   });
  }
}
