FROM node:22.9.0-alpine AS build

RUN apk add --no-cache g++ make python3

WORKDIR /build

COPY . ./

RUN npm ci && \
    npm run prebuild && \
    npm run build && \
    rm -rf /root/.npm

FROM node:22.9.0-alpine

WORKDIR /usr/src/app

COPY --from=build /build/node_modules /usr/src/app/node_modules

COPY . ./

CMD ["npm", "run", "start:dev"]
