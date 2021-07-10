FROM node:14-alpine
# Create app directory
WORKDIR /usr/src/app/client

# Install app dependencies

COPY client/ /usr/src/app/client/


RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

EXPOSE 3000

ENTRYPOINT ["react-scripts", "start"]
