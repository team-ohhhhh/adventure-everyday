# FROM nginx
# RUN mkdir /app
# WORKDIR /app
# RUN mkdir ./build
# ADD ./build ./build
# RUN rm /etc/nginx/conf.d/default.conf
# COPY ./nginx.conf /etc/nginx/conf.d
# # COPY /var/log/nginx /var/log/nginx
# # COPY /etc/letsencrypt /etc/letsencrypt
# EXPOSE 80
# # EXPOSE 443
# CMD ["nginx", "-g", "daemon off;"]

FROM node:18-alpine as builder
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY ./ ./
RUN npm run build

FROM nginx 
EXPOSE 3000
COPY ./default.conf /etc/nginx/conf.d/default.conf 
COPY --from=builder usr/src/app/build  /usr/share/nginx/html 

