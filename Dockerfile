FROM library/postgres
COPY 00-init.sql /docker-entrypoint-initdb.d/
COPY 01-data.sql /docker-entrypoint-initdb.d/

FROM node:16.9.0-alpine
ENV PORT 80
RUN npm install
CMD ["npm", "run", "start"]