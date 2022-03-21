FROM library/postgres
COPY 00-init.sql /docker-entrypoint-initdb.d/
COPY 01-data.sql /docker-entrypoint-initdb.d/

FROM alpine

COPY --from=library/docker:latest /usr/local/bin/docker /usr/bin/docker
COPY --from=docker/compose:1.29.0 /usr/local/bin/docker-compose /usr/bin/docker-compose

FROM node:16
WORKDIR /next-app
ENV PORT 80
EXPOSE 80
COPY . /next-app
RUN npm install
CMD ["npm", "run", "dev"] 