/**
* Mongo Native service
*/
var mongoNativeService = require('../services/mongoNativeService.js');

var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('tvshowmongooses');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the document collection");
    callback(result);
  });
}

module.exports = {
  // (Mirar si mola esto) Solo cargamos el cliente una vez y lo compartimos,
  // hacemos referencia así:
  //mongoNativeService.MongoClient
  create: function(req,res){
    console.log('M.I.K.E - POST ' + req.url);
    insertDocuments(mongoNativeService.mongoNativeDB, function() {
      mongoNativeDB.close();
    });
    res.status(200).send("Psss a saber");
  }
}
