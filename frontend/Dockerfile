FROM node:15.14.0-alpine3.12 as base

WORKDIR /app

# downgrade npm version to avoid chokidar error
RUN npm install -g npm@7.5.4

COPY ./package.json ./package-lock.json ./

RUN npm ci

COPY babel.config.js ./
COPY src ./src
COPY public ./public

FROM base as dev

CMD ["npm", "run", "serve"]

FROM base as build

# RUN npm ci --production

RUN npm run build

FROM nginx:1.21.4-alpine as prod

COPY --from=build /app/dist /usr/share/nginx/html/