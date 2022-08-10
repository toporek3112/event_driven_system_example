require('dotenv').config();
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const utils = require('../../utils/index')
const InventoryItem = require('../models/InventoryItem');


// Endpoints
router.get("/Products", async (req, res) => {
    
});


module.exports = router;
