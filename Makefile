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
