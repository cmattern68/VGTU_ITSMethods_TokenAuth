#!/bin/bash

function f.rebuild() {
  echo -e "\e[32mStart application rebuild. Please wait ...\e[0m"

  docker exec -it vgtu_nodejs_api sequelize db:migrate:undo:all
  rm -rf ./node_modules/
  npm install

  docker-compose build

  echo -e "\e[32mApplication rebuilt.\e[0m"
}