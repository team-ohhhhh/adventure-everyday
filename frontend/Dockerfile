FROM node:18.13.0-alpine as builder
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY ./ ./
RUN npm run build

FROM nginx:1.22.1-alpine
EXPOSE 3000
COPY ./default.conf /etc/nginx/conf.d/default.conf 
COPY --from=builder usr/src/app/build  /usr/share/nginx/html 

