#!/bin/bash

function f.install() {
  echo -e "\e[32mStart application installation. Please wait ...\e[0m"

  systemctl is-active --quiet docker
  if ! [ $? -eq 0 ]; then
    systemctl start docker
  fi

  npm install --unsafe-perm
  npm install -g sequelize-cli

  docker-compose build

  echo -e "\e[32mApplication built.\e[0m"
}