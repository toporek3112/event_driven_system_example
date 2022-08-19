const { Kafka } = require('kafkajs')
const generateRandomOrder = require('../../models/order');
require('dotenv').config()

const { SERVICE_NAME, BROKER_1, BROKER_2, BROKER_3 } = process.env

const kafka = new Kafka({
  clientId: SERVICE_NAME,
  brokers: [ BROKER_1, BROKER_2, BROKER_3 ],
})


const main = async () => {
  console.log(`${SERVICE_NAME} starting...`);

  const producer = await kafka.producer({
    allowAutoTopicCreation: false,
    transactionTimeout: 30000,
    idempotent: true
  })

  await producer.connect()
    .then(() => console.log("Connected to kafka cluster"))
    .catch((err) => console.error(err));

  setInterval(async () => {
    let order = generateRandomOrder()

    console.log(order);

    await producer.send({
      topic: 'orders',
      messages: [
        { key: order.order_id, value: JSON.stringify(order) }
      ],
    })
      .then(() => console.log(`Successfully saved order ${order.order_id} to orders topic`))
      .catch((err) => console.error(err))
  }, 60000)

}

main();
