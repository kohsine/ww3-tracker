FROM library/postgres
COPY 00-init.sql /docker-entrypoint-initdb.d/
COPY 01-data.sql /docker-entrypoint-initdb.d/

FROM node:16-alpine3.11
WORKDIR /app
ENV PORT 80
EXPOSE 80
COPY . /app
RUN npm install
CMD ["npm", "run", "dev"]