# Real-time multi-user simulation
A simple client / authoritative server synchronization implementation with Socket.io. The server sends state to each user, each client then interpolates between the previously received state and visualizes the state using the html canvas api. Each client sends their inputs to the server.

[Read the wiki for a technical overview.](https://github.com/Blodir/murts/wiki)

## Running

### Locally

Requires nodejs
To install: `npm install`

Build and run locally @ port 3000: `npm start`

### Using Docker

First, you need to have [Docker](https://docs.docker.com/get-docker/) installed on your system. 

Then build the image and run it using these commands.
```
docker build . -t murts
docker run -p 3000:3000 murts
```
Alternatively, you can also run the latest image straight from [Docker Hub](https://hub.docker.com/r/jonsotal/murts).
```
docker run -p 3000:3000 jonsotal/murts
```
