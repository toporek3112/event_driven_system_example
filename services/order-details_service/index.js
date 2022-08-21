require('dotenv').config()
const { Kafka } = require('kafkajs')
const { SchemaRegistry, SchemaType } = require("@kafkajs/confluent-schema-registry");

const { SERVICE_NAME, BROKER_1, BROKER_2, BROKER_3 } = process.env

const kafka = new Kafka({ clientId: SERVICE_NAME, brokers: [ BROKER_1, BROKER_2, BROKER_3 ] })
const consumer = kafka.consumer({ groupId: process.argv[ 2 ] })
const producer = kafka.producer({ allowAutoTopicCreation: false, transactionTimeout: 30000, idempotent: true })

const registry = new SchemaRegistry({ host: 'http://localhost:8081/' })
const orderValidationSchema = require("../../schemas/orderValidationSchema")

const validateOrder = (order) => {
  return {
    "order_id": order.order_id,
    "valid": false,
    "Service": SERVICE_NAME,
    "message": "Order Details are not valid, please contact our customer hotline."
  }
}

const main = async () => {
  console.log(`${SERVICE_NAME} starting...`);

  const { id } = await registry.register({ type: SchemaType.AVRO, schema: JSON.stringify(orderValidationSchema) })

  await consumer.connect()
    .then(() => console.log("Connected to kafka cluster"))
    .catch((err) => console.error(err));

  await consumer.subscribe({ topics: [ 'orders' ], fromBeginning: true })
    .then(() => console.log("Subscribed to orders topic"))
    .catch((err) => console.error(err));

  await producer.connect()
    .then(() => console.log("Connected to kafka cluster"))
    .catch((err) => console.error(err));

  // Consuming from orders Topic Validating and Producing to validated_orders Topic
  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      const order = await registry.decode(message.value);
      const validatedOrder = validateOrder(order);
      const encodedValidatedOrder = await registry.encode(id, validatedOrder)

      producer.send({
        topic: "validated_orders",
        messages: [ { key: order.order_id, value: encodedValidatedOrder } ]
      })
        .then(() => console.log(`Successfully saved order ${order.order_id} to validated_orders topic`))
        .catch((err) => console.error(err))
    },
  })
    .catch((err) => console.error(err));
}

main();
