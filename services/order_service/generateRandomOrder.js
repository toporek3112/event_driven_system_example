const { v4: uuidv4 } = require('uuid');
const items = require('./items');
const addresses = require('./addresses');

const generateRandomOrder = () => {
    const randomItems = [];
    
    for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
        randomItems.push(items[Math.floor(Math.random() * items.length)])
    }
    
    return {
        "order_time": Date.now(),
        "order_id": uuidv4(),
        "items": randomItems,
        "address": addresses[Math.floor(Math.random() * addresses.length)]
    }
}

module.exports = generateRandomOrder;