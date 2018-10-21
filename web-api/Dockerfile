
# Create image based on the official Node image from the dockerhub
FROM node:latest

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Copy dependency definitions
# Get all the code needed to run the app
COPY package.json /usr/src/app
COPY server /usr/src/app/server
COPY .env.docker /usr/src/app/.env

# Install dependecies
RUN npm install

# Serve the app
CMD ["npm", "start"]
