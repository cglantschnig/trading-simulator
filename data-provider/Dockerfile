FROM node:14-alpine

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY src ./src

# Install app dependencies
RUN npm install

CMD [ "npm", "run", "start" ]
