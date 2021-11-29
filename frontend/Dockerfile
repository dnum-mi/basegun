FROM node:lts-alpine3.12

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json .
RUN npm install

COPY public/ pulic/
COPY src/ src/
CMD npm run serve