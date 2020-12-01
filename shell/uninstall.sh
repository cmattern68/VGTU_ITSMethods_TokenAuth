#!/bin/bash

function f.uninstall() {
  echo -e "\e[31mStart uninstallation. Please wait ...\e[0m"
  rm -rf ./node_modules/

  docker stop vgtu_balancer
  docker stop vgtu_nodejs_api
  docker stop vgtu_pgadmin
  docker stop vgtu_pgsql_db

  docker rm vgtu_balancer
  docker rm vgtu_nodejs_api
  docker rm vgtu_pgadmin
  docker rm vgtu_pgsql_db

  echo -e "\e[32mUninstallation complete.\e[0m"
}