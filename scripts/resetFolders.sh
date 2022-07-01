#!/bin/sh

if [ -d "./data" ]; then
  echo "Removing data Folder..."
  rm -rf ./data
fi

echo "Creating folder structure for Kafka cluster..."
mkdir -p ./data/kafka/kafka1
mkdir ./data/kafka/kafka2
mkdir ./data/kafka/kafka3

mkdir -p ./data/zookeeper/zoo1
mkdir ./data/zookeeper/zoo2
mkdir ./data/zookeeper/zoo3

chmod -R 775 ./data 
chown -R 1001:$USER ./data