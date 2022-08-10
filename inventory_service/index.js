const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3001;

const app = express();

// routes
const apiEndpoints = require('./Routes/apiEndpoints')
const frontendEndpoints = require('./Routes/frontendEndpoints')

//View Engine
app.set('views', path.join(__dirname, 'Public/views'));
app.set('view engine', 'ejs');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//set static Folder
app.use(express.static(path.join(__dirname, './Public/')));

// endpoints
app.use('/api', apiEndpoints);
app.use('/', frontendEndpoints);

app.get('/', (req, res) => {
  res.send('Inventory Service')
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

