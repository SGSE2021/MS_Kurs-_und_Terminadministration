FROM node:14-alpine
# Create app directory
WORKDIR /usr/src/app/server

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY server/package*.json /usr/src/app/server/
COPY server/index.js /usr/src/app/server/

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

EXPOSE 8080

ENTRYPOINT ["node", "index.js"]
