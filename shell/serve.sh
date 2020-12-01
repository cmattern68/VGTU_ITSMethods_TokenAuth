#!/bin/bash

function f.serve() {
  echo -e "\e[32mStarting API Server ...\e[0m"
  docker-compose up
}