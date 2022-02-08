# Farm-Simulator

Coding Task

## Example APIs Endpoint with methods

baseurl = localhost:3000

### GET - baseurl/api/v1/farm-units

- Fetches all farm units

### POST - baseurl/api/v1/farm-units/

- Creates farm-units for existing farm building

### PUT - baseurl/api/v1/farm-units/:id

- Updates farm-units by id with restricted time interval updates

### GET - baseurl/api/v1/farm-units/:farm_building_id

- Fetches farm-units for a particular farm building

### GET - baseurl/api/v1/farm-buildings

- Fetches all farm building

### POST - baseurl/api/v1/farm-buildings

- Creates farm-buildings

# Build the docker image

- sudo docker build -t <docker-image-name> <filepath>
  e.g docker build -t farm-simulator .

# To run the container

Exposed ports
3000 8001 8080 8100

# Use the command below if postgres is not run as a container on your PC

- sudo docker run -d -p <Host port>:<Docker port> --env-file <name-of-environment-variable> <docker-image-name>
  sudo docker run -d -p 3000:3000 --env-file ./.env --name farm-manager farm-simulator

### Seed data into postgres

- sudo docker exec -it farm-manager bash
- npx sequelize-cli db:migrate
- npx sequelize-cli db:seed:all

# Use the commands if postgres is run as a container on your PC

docker container run --rm --detach --name=farm-manager-db --env POSTGRES_DB=farm_manager --env POSTGRES_PASSWORD=mysecretpassword postgres

### NOTE: DB credentials passed to container should match DB credentials passed to Node .env files

# Create a network group

- sudo docker network create farm-manager-network
- sudo docker network connect farm-manager-network farm-manager-db

* Confirm if farm-manager-db is connected to network:
  docker network inspect --format='{{range .Containers}} {{.Name}} {{end}}' farm-manager-network

## Create application container and attach to network group

- sudo docker container run --rm --detach --name farm-manager --publish 3000:3000 --network farm-manager-network --env-file ./.env farm-simulator

### Seed data into postgres

- sudo docker exec -it farm-manager bash
- npx sequelize-cli db:migrate
- npx sequelize-cli db:seed:all

## Notes on using this specified eslint configurations

AirBnB;s styling brings about neatness, simplicity and gives a very fast option when a developer is focusing on code logic than looking out for why a syntaxing rule is not current.
I used it specifically and avoided using es-lint extension due to my recent health conditions and focused more using a very simple extension.
