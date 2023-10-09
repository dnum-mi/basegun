FROM node:18-bullseye-slim as base

WORKDIR /app

# certificates config
ARG NODE_EXTRA_CA_CERTS
COPY ./cert/. /etc/ssl/certs/

COPY ./package.json ./package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY src ./src
COPY public ./public
COPY vite.config.js index.html ./

FROM base as dev

CMD ["npm", "run", "dev"]

FROM base as build

# RUN npm ci --production
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.21.4-alpine as prod

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist /usr/share/nginx/html/

FROM prod as test