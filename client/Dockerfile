FROM node:16-alpine3.11 as builder
WORKDIR /usr/src/app/client
ENV PATH /usr/src/app/client/node_modules/.bin:$PATH
COPY client/package.json ./
COPY client/package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@4.0.3 -g --silent
COPY client/ ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=builder /usr/src/app/client/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]   
