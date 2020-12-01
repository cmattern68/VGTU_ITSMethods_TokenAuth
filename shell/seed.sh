#!/bin/bash

function f.seed() {
  echo -e "\e[32mRunning seeders. Please wait ...\e[0m"

  docker exec -it vgtu_nodejs_api sequelize db:seed:all
}