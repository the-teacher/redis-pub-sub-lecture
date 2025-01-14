############################################
# MAIN
############################################
up:
	docker-compose up -d

down:
	docker-compose down

status:
	docker-compose ps

############################################
# REDIS SERVICE
############################################

redis_up:
	docker-compose up -d redis

redis_down:
	docker-compose stop redis

redis_shell:
	docker-compose exec redis sh

redis_start:
	make redis_up
	docker-compose exec -d redis redis-server \
		--appendonly yes \
		--requirepass qwerty \
		--save 60 1

redis_stop:
	docker-compose exec redis redis-cli -a qwerty shutdown

redis_status:
	docker-compose exec redis redis-cli -a qwerty ping

############################################
# NodeJS SERVICE
############################################

nodejs_up:
	docker-compose up -d nodejs

nodejs_down:
	docker-compose stop nodejs

nodejs_shell:
	docker-compose exec nodejs sh

nodejs_status:
	docker-compose exec nodejs ps aux

nodejs_stop_node:
	docker-compose exec nodejs pkill node

nodejs_publisher_start:
	docker-compose exec nodejs yarn add redis chalk@4
	docker-compose exec nodejs yarn node publisher.js

# Start subscriber
# make nodejs_subscriber_start (my_channel by default)
# make nodejs_subscriber_start channel_name=weather_news
# make nodejs_subscriber_start channel_name=finance_news
# make nodejs_subscriber_start channel_name=education_news
nodejs_subscriber_start:
	docker-compose exec -e CHANNEL_NAME=$(channel_name) nodejs yarn node subscriber.js
