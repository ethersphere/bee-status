FROM node:15.14-alpine AS build
WORKDIR /src
COPY . .
RUN npm ci
RUN npm run build

FROM node:15.14-alpine AS final
RUN npm i -g serve
WORKDIR /app
COPY --from=build /src/build .
EXPOSE 5000
ENTRYPOINT ["serve"]
