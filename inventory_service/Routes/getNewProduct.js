require('dotenv').config();
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const utils = require('../../utils/index')
const InventoryItem = require('../models/InventoryItem');

main().then(() => console.log("Connected to Inventory DB")).catch(err => console.error(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/inventory_db', { user: "admin", pass: "password", authSource: "admin" });
}

// Endpoints
router.get("/getNewProduct", async (req, res) => {
    try {
        let asin = 'B077ZGRY9V' //await getASIN(); B08BF4CZSV  B077ZGRY9V
        console.log(`ASIN: ${asin}`);

        const response = await fetch(`https://amazon-products1.p.rapidapi.com/product?country=US&asin=${asin}&topReviews=true`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.API_KEY,
                'X-RapidAPI-Host': process.env.API_HOST
            }
        })

        let itemJson = await response.json();

        if (itemJson.message) {
            res.send(itemJson.message)
        }

        let item = new InventoryItem(itemJson);

        item.save()
            .then(data => {res.send(data)})
            .catch(err => {console.log(err); res.status(400).send(err)})

    } catch (error) {
        console.error(error)
    }
});


// Functions
const getASIN = async () => {
    try {
        let response = await fetch('https://amazon-products1.p.rapidapi.com/asin?url=https%3A%2F%2Fwww.amazon.com%2FHyperX-Cloud-Flight-Detachable-Comfortable%2Fdp%2FB077ZGRY9V%3Fpf_rd_r%3D1TYRM42Q74V7E2JPZ4WN%26pf_rd_p%3D6d2ce2da-9cfb-4c5c-ab7a-c4d61c9f9875%26pd_rd_r%3Dfe1cb1de-34f4-44e1-94fe-6adcbcedfe9c%26pd_rd_w%3DFU6ls%26pd_rd_wg%3DzQGMv%26ref_%3Dpd_gw_unk', {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.API_KEY,
                'X-RapidAPI-Host': process.env.API_HOST
            }
        })

        let responseJson = await response.json();

        await utils.sleep(1000);
        return responseJson.asin;
    } catch (error) {
        console.error(error)
    }
}

module.exports = router;
