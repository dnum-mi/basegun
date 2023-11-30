FROM node:20-slim as base

WORKDIR /app

# certificates config
ARG NODE_EXTRA_CA_CERTS
COPY ./cert/. /etc/ssl/certs/

COPY ./package.json ./package-lock.json ./
RUN npm ci

COPY . .

FROM base as dev

CMD ["npm", "run", "dev"]

FROM base as build

RUN npm run build

FROM nginxinc/nginx-unprivileged:1.24-alpine as prod

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist /usr/share/nginx/html/