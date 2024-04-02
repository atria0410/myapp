FROM postgres:16.2

COPY postgresql.conf /etc/postgresql/
COPY create-multiple-databases.sh /docker-entrypoint-initdb.d/

CMD ["postgres", "-c", "config_file=/etc/postgresql/postgresql.conf"]
