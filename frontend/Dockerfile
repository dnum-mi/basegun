FROM node:lts-bullseye-slim

WORKDIR /app

# certificates config
ARG NODE_EXTRA_CA_CERTS
COPY ./cert/. /etc/ssl/certs/

# downgrade npm version to avoid chokidar error
RUN npm install -g npm@latest

COPY ./package.json ./package-lock.json ./
RUN npm ci

COPY src ./src
COPY public ./public
COPY vite.config.js vue.config.js index.html ./

FROM base as dev

CMD ["npm", "run", "dev"]

FROM base as build

# RUN npm ci --production
RUN npm run build

FROM nginx:1.21.4-alpine as prod

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist /usr/share/nginx/html/