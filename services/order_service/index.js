require('dotenv').config()
const { Kafka } = require('kafkajs')
const { SchemaRegistry, SchemaType } = require("@kafkajs/confluent-schema-registry");
const generateRandomOrder = require('./generateRandomOrder');

const { SERVICE_NAME, BROKER_1, BROKER_2, BROKER_3 } = process.env

const kafka = new Kafka({ clientId: SERVICE_NAME, brokers: [ BROKER_1, BROKER_2, BROKER_3 ] })
const producer = kafka.producer({ allowAutoTopicCreation: false, transactionTimeout: 30000, idempotent: true })

const registry = new SchemaRegistry({ host: 'http://localhost:8081/' })
const orderSchema = require("../../schemas/orderSchema")

const main = async () => {
  console.log(`${SERVICE_NAME} starting...`);

  const { id } = await registry.register({ type: SchemaType.AVRO, schema: JSON.stringify(orderSchema) })

  await producer.connect()
    .then(() => console.log("Connected to kafka cluster"))
    .catch((err) => console.error(err));

  setInterval(async () => {
    const order = generateRandomOrder();
    const encodedOrder = await registry.encode(id, order);

    console.log(order, encodedOrder);

    await producer.send({
      topic: 'orders',
      messages: [
        { key: order.order_id, value: encodedOrder }
      ],
    })
      .then(() => console.log(`Successfully saved order ${order.order_id} to orders topic`))
      .catch((err) => console.error(err))
  }, 5000)

}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
