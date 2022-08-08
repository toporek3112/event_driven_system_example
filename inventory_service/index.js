const express = require('express');

const PORT = process.env.PORT || 3001;

const app = express();

// routes
const getNewProduct = require('./Routes/getNewProduct')

// endpoints
app.use('/api', getNewProduct);

app.get('/', (req, res) => {
  res.send('Inventory Service')
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

