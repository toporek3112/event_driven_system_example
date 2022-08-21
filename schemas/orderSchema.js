const orderSchema = {
    "name": "order",
    "type": "record",
    "namespace": "poc.eds",
    "fields": [
        {
            "name": "order_time",
            "type": "long"
        },
        {
            "name": "order_id",
            "type": "string"
        },
        {
            "name": "items",
            "type": {
                "type": "array",
                "items": {
                    "name": "item",
                    "type": "record",
                    "fields": [
                        {
                            "name": "itemId",
                            "type": "int"
                        },
                        {
                            "name": "title",
                            "type": "string"
                        },
                        {
                            "name": "price",
                            "type": "float"
                        },
                        {
                            "name": "stars",
                            "type": "float"
                        }
                    ]
                }
            }
        },
        {
            "name": "address",
            "type": {
                "name": "address",
                "type": "record",
                "fields": [
                    {
                        "name": "state",
                        "type": "string"
                    },
                    {
                        "name": "city",
                        "type": "string"
                    },
                    {
                        "name": "street",
                        "type": "string"
                    },
                    {
                        "name": "door",
                        "type": "int"
                    },
                    {
                        "name": "postcode",
                        "type": "int"
                    }
                ]
            }
        }
    ]
}

module.exports = orderSchema;