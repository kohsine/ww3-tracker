FROM library/postgres
COPY 00-init.sql /docker-entrypoint-initdb.d/
COPY 01-data.sql /docker-entrypoint-initdb.d/
