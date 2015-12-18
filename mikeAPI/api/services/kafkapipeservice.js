/**
 * We load kafka for node
 */
 var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    client = new kafka.Client('localhost:2181/','MIKEAPI_NODE_JS'),
    producer = new Producer(client),
    KeyedMessage = kafka.KeyedMessage
    kafkaConnected = false;;
 /*var client = new kafkapipe.Client({
   host: 'localhost:9200',
   log: 'trace'
 });*/


module.exports = {
  kafkapipe : kafka,
  kafkapipeclient: client,
  kafkapipeproducer: producer,
  KeyedMessage: KeyedMessage,
  kafkaConnected: kafkaConnected,
  putMessageOnTopic: function(topicParam,bodyParam,client, producer, callback){
    km = new KeyedMessage('key', 'message');
    payloads = [{ topic: topicParam, messages: bodyParam, partition: 0 }];
    producer.on('ready', function () {
      // Checking the connection
      kafkaConnected = true;
      console.log("INFO (PRODUCER ready) kafka producer is connected");
    });

    producer.on('error', function (err) {
      // Checking the connection
      kafkaConnected = false;
      console.log("INFO (PRODUCER ready) kafka producer is not connected");

      console.log("ERROR (PRODUCER) No se que le pasa"+err);
      callback("ERROR (PRODUCER) No se que le pasa", "ERROR (PRODUCER) No se que le pasa");
    });

    producer.on('uncaughtException', function (err) {
    console.log("ERROR (PRODUCER uncaught) No se que le pasa"+err);
    });

    producer.send(payloads, function (err, data) {
      if (err != null && err != undefined){
        console.log("ERROR (PRODUCER ready) No se que le pasa"+err);
        callback("ERROR (PRODUCER ready) No se que le pasa", "ERROR (PRODUCER ready) No se que le pasa");
      }else{
        console.log("(PRODUCER ready) Desde el servicio debería escupir algo: " + JSON.stringify(data));
        callback("", data);
      }
    });

  }
}
