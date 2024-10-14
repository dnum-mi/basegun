FROM node:20-slim AS base

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm ci

COPY . .

FROM base AS build

RUN npm run build

FROM nginxinc/nginx-unprivileged:1.24-alpine AS prod

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist /usr/share/nginx/html/