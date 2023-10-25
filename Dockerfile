FROM node:16-alpine as build-stage
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm rebuild node-sass
RUN npm run build


FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx_local.conf /etc/nginx/nginx.conf

RUN mkdir /etc/nginx/logs

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
