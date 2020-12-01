FROM node

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install -g nodemon
RUN npm install

COPY . .

RUN npm install -g --save sequelize-cli

COPY ./PostgreSQL/docker-entrypoint.sh /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]