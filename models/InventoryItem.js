const mongoose = require('mongoose');

const inventoryItemSchema = mongoose.Schema(
    {
        "error": {
            "type": "Boolean"
        },
        "asin": {
            "type": "String"
        },
        "title": {
            "type": "String"
        },
        "images": {
            "type": [
                "String"
            ]
        },
        "full_link": {
            "type": "String"
        },
        "description": {
            "type": "String"
        },
        "prices": {
            "current_price": {
                "type": "Number"
            },
            "previous_price": {
                "type": "Number"
            },
            "list_price": {
                "type": "Number"
            },
            "checkout_discount": {
                "type": "Number"
            },
            "prime_only_discount": {
                "type": "Number"
            },
            "currency": {
                "type": "String"
            }
        },
        "reviews": {
            "total_reviews": {
                "type": "Number"
            },
            "stars": {
                "type": "Number"
            },
            "answered_questions": {
                "type": "Number"
            },
            "top_reviews": {
                "type": [
                    "Mixed"
                ]
            }
        },
        "coupon": {
            "coupon_code": {
                "type": "String"
            },
            "coupon_discount": {
                "type": "Number"
            },
            "box_coupon": {
                "type": "Boolean"
            },
            "box_coupon_discount": {
                "type": "Number"
            },
            "box_coupon_value": {
                "type": "String"
            }
        },
        "prime": {
            "type": "Boolean"
        },
        "amazon_choice": {
            "type": "Boolean"
        },
        "out_of_stock": {
            "type": "Boolean"
        },
        "deal_info": {
            "deal_id": {
                "type": "String"
            },
            "lightning_deal": {
                "type": "Boolean"
            },
            "requested_perc": {
                "type": "Number"
            },
            "timestamp_end": {
                "type": "Number"
            }
        },
        "category": {
            "type": "String"
        },
        "sub_categories": {
            "type": "String"
        },
        "category_id": {
            "type": "Number"
        },
        "sub_categories_ids": {
            "type": [
                "Number"
            ]
        },
        "ship_info": {
            "sold_by": {
                "type": "String"
            },
            "shipped_by": {
                "type": "String"
            },
            "return_policy": {
                "type": "String"
            },
            "warranty_policy": {
                "type": "String"
            }
        },
        "api_info": {
            "type": "String"
        },
        "brand": {
            "type": "String"
        },
        "bestseller_ranks": {
            "type": [
                "String"
            ]
        },
        "features": {
            "type": [
                "String"
            ]
        },
        "variations": {
            "type": "Array"
        },
        "colors": {
            "type": "Array"
        },
        "similar_items": {
            "type": [
                "String"
            ]
        },
        "dimensions": {
            "type": "String"
        },
        "weight": {
            "type": "String"
        },
        "model": {
            "type": "String"
        }
    }
);

module.exports = mongoose.model('InventoryItem', inventoryItemSchema);
