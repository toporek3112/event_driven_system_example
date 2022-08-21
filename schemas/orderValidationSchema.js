const orderValidationSchema = {
    "name": "validatedOrder",
    "type": "record",
    "namespace": "poc.eds",
    "fields": [
        {
            "name": "order_id",
            "type": "string"
        },
        {
            "name": "valid",
            "type": "boolean"
        },
        {
            "name": "Service",
            "type": "string"
        },
        {
            "name": "message",
            "type": "string"
        }
    ]
}

module.exports = orderValidationSchema;