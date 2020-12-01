#!/bin/bash

function f.migrate() {
  echo -e "\e[32mRunning migration. Please wait ...\e[0m"

  docker exec -it vgtu_nodejs_api sequelize db:migrate
}