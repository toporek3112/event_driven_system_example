const { Kafka } = require('kafkajs')
require('dotenv').config()

const { SERVICE_NAME, BROKER_1, BROKER_2, BROKER_3 } = process.env

const kafka = new Kafka({
  clientId: SERVICE_NAME,
  brokers: [ BROKER_1, BROKER_2, BROKER_3 ],
})

const validatedOrder = (order) => {
  return { 
    "order": order.order_id, 
    "valid": false,
    "Service": SERVICE_NAME, 
    "message": "Suspected fraud attempt, please contact our customer hotline." }
}

const main = async () => {
  console.log(`${SERVICE_NAME} starting...`);

  const consumer = await kafka.consumer({ groupId: process.argv[ 2 ] })

  await consumer.connect()
    .then(() => console.log("Connected to kafka cluster"))
    .catch((err) => console.error(err));

  await consumer.subscribe({ topics: [ 'orders' ] })
    .then(() => console.log("Subscribed to orders topic"))
    .catch((err) => console.error(err));

  const producer = await kafka.producer({
    allowAutoTopicCreation: false,
    transactionTimeout: 30000,
    idempotent: true
  })

  await producer.connect()
    .then(() => console.log("Connected to kafka cluster"))
    .catch((err) => console.error(err));

  // Consuming from orders Topic Validating and Producing to validated_orders Topic
  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      const order = JSON.parse(message.value.toString());
      const validated = validatedOrder(order);

      producer.send({
        topic: "validated_orders",
        messages: [
          { key: order.order_id, value: JSON.stringify(validated) }
        ]
      })
        .then(() => console.log(`Successfully saved order ${order.order_id} to validated_orders topic`))
        .catch((err) => console.error(err))
    },
  })
    .catch((err) => console.error(err));
}

main();
