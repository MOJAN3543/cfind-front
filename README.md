# C-FIND : Cardio-fibrosis Innovative Novel Drug Development
## Dependencies
* Docker >= 27.3.1
## How to use
```bash
$ git clone https://github.com/MOJAN3543/cfind-front.git

# Go into the repository
$ cd cfind-front

# Build Docker Image
$ docker build -t cfind-frontend-image .

# Run Docker Container
$ docker run -d --name cfind-frontend-container -p 80:80 cfind-frontend-image
```
## Stop & Remove Container
```bash
# Stop Container
$ docker stop c-find-frontend-container

# Remove Container
$ docker rm cfind-frontend-container
```