#!/bin/sh

docker stop inventory_mongo_db
docker stop mongo-express

docker rm inventory_mongo_db
docker rm mongo-express

rm -rf ../data/mongo-volume
