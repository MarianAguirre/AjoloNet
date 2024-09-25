# Use official node image as the base image
FROM node:latest as build

WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli

COPY . .

RUN npm run build --configuration=production

FROM nginx:latest

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/fronted/browser /usr/share/nginx/html

EXPOSE 80
