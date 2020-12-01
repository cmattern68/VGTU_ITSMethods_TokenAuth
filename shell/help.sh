#!/bin/bash

function f.printHelp() {
  printf "usage n1: ./shell.sh [option]|[command] - Run as command line tool.\n"
  printf "usage n2: ./shell.sh                    - Run as shell tool.\n"
  printf "\n"
  printf "Option:\n"
  printf "\t-h  \t\tDisplay Help menu.\n\n"
  printf "Shell command:\n"
  printf "\thelp\t\tDisplay help.\n"
  printf "\tinstall\t\tInstall all dependencies and build the docker container.\n"
  printf "\tuninstall\tUninstall all dependencies and remove all docker container.\n"
  printf "\trebuild\t\tRebuild docker container.\n"
  printf "\tserve\t\tRun docker server.\n"
  printf "\tdbinfo\t\tShow databases connection.\n"
  printf "\tmigrate\t\tRun databases migrations..\n"
  printf "\tseed\t\tSeed databases.\n"
  printf "\texit\t\tExit the program.\n"
}