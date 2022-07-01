echo "Waiting for Kafka to come online..."

cub kafka-ready -b kafka1:19092 1 20

kafka-topics \
  --bootstrap-server kafka1:19092 \
  --topic orders \
  --replication-factor 3 \
  --partitions 3 \
  --config "cleanup.policy=compact"  \
  --config "min.cleanable.dirty.ratio=0.01"  \
  --config "segment.ms=100"  \
  --config "delete.retention.ms=100"  \
  --create

kafka-topics \
  --bootstrap-server kafka1:19092 \
  --topic orders_validation \
  --replication-factor 3 \
  --partitions 3 \
  --config "cleanup.policy=compact"  \
  --config "min.cleanable.dirty.ratio=0.01"  \
  --config "segment.ms=100"  \
  --config "delete.retention.ms=100"  \
  --create

kafka-topics \
  --bootstrap-server kafka1:19092 \
  --topic validated_orders \
  --replication-factor 3 \
  --partitions 3 \
  --config "cleanup.policy=compact"  \
  --config "min.cleanable.dirty.ratio=0.01"  \
  --config "segment.ms=100"  \
  --config "delete.retention.ms=100"  \
  --create

kafka-topics \
  --bootstrap-server kafka1:19092 \
  --topic customers \
  --replication-factor 3 \
  --partitions 3 \
  --config "cleanup.policy=compact"  \
  --config "min.cleanable.dirty.ratio=0.01"  \
  --config "segment.ms=100"  \
  --config "delete.retention.ms=100"  \
  --create

kafka-topics \
  --bootstrap-server kafka1:19092 \
  --topic inventory \
  --replication-factor 3 \
  --partitions 3 \
  --config "cleanup.policy=compact"  \
  --config "min.cleanable.dirty.ratio=0.01"  \
  --config "segment.ms=100"  \
  --config "delete.retention.ms=100"  \
  --create


sleep infinity
