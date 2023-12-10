FROM node:20-alpine AS build

WORKDIR /home/test

COPY package.json .
COPY package-lock.json .

RUN npm ci
COPY . .
EXPOSE 4200
RUN npm run build

FROM nginx:1.24.0
COPY nginx.conf /ect/nginx/nginx.conf
COPY --from=build /home/test/dist/fromhabrtest /usr/share/nginx/html

