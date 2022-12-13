FROM node:18-bullseye-slim as base

WORKDIR /app

# certificates config
ARG NODE_EXTRA_CA_CERTS
COPY ./cert/. /etc/ssl/certs/

# downgrade npm version to avoid chokidar error
RUN npm install -g npm@8

COPY ./package.json ./package-lock.json ./
RUN npm ci

COPY src ./src
COPY public ./public
COPY vite.config.js index.html ./

FROM base as dev

CMD ["npm", "run", "dev"]

FROM base as build

ARG WORKSPACE
RUN echo "VITE_WORKSPACE='$WORKSPACE'" > .env
RUN npm run build

FROM nginx:1.21.4-alpine as prod

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist /usr/share/nginx/html/