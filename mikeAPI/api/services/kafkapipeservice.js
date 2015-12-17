/**
 * We load kafka for node
 */
 var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    client = new kafka.Client(),
    producer = new Producer(client);
 /*var client = new kafkapipe.Client({
   host: 'localhost:9200',
   log: 'trace'
 });*/


module.exports = {
  kafkapipe : kafka,
  kafkapipeclient: client,
  kafkapipeproducer: producer,
  putMessageOnTopic: function(topicParam,bodyParam,client, producer, callback){
    /*km = new KeyedMessage('key', 'message'),
    payloads = [{ topic: topicParam, messages: bodyParam, partition: 0 }];
    producer.on('ready', function () {
      producer.send(payloads, function (err, data) {
        if (err != null && err != undefined){
          console.log("ERROR No se que le pasa"+err);
        }else{
          console.log("Desde el servicio debería escupir algo: " + data);
        }
      });
      producer.on('error', function (err) {
        console.log("ERROR No se que le pasa"+err);
      });
    }*/
    console.log("ERROR No se que le pasa");
    callback("ERROR No se que le pasa", "ERROR No se que le pasa");
  }
}
