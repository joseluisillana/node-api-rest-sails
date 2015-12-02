/*
  Cargamos el cliente de MongoDB Nativo
*/
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// URL
var url = 'mongodb://10.211.55.112:27017/restexample';

/*
Usamos el método connect para abrir una conexión con el servidor

Nos servimos de los métodos de testeo para comprobar la conexión
*/
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("[ MONGO NATIVE DRIVER ] - Connected correctly to server");

  //db.close();
});

/**
 * Let's make our Mongodb Schemas/Models
 */
 module.exports = {
     MongoClient: MongoClient
 }
