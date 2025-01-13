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
