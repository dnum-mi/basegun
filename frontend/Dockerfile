FROM node:20-slim AS base

WORKDIR /app

RUN npm install -g pnpm

COPY ./package.json ./ ./pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

FROM base AS build

RUN pnpm run build

FROM nginxinc/nginx-unprivileged:1.24-alpine AS prod

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist /usr/share/nginx/html/