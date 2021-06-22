FROM node:alpine

WORKDIR /app

COPY . .

RUN npm install && npm run build

FROM nginx

EXPOSE 80

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=0 /app/dist/guess-my-number ./

ENTRYPOINT ["nginx", "-g", "daemon off;"]