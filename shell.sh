#!/bin/bash

source ./shell/source.sh

declare -a commandsKey=("help" "install" "uninstall" "rebuild" "serve" "dbinfo" "migrate" "seed")
declare -A commands
commands["help"]="f.printHelp"        #DONE
commands["install"]="f.install"       #DONE
commands["uninstall"]="f.uninstall"   #DONE
commands["rebuild"]="f.rebuild"       #DONE
commands["serve"]="f.serve"           #DONE
commands["dbinfo"]="f.dbinfo"         #DONE
commands["migrate"]="f.migrate"       #DONE
commands["seed"]="f.seed"             #DONE

if [[ $1 == "-h" ]]; then
   f.printHelp
   exit 0
fi

if [[ $EUID -ne 0 ]]; then
   echo -e "\e[31mThis script must be run as root.\e[0m"
   exit 1
fi

if ! [ -z "$1" ]; then
  cmd=$1
  if [[ " ${commandsKey[@]} " =~ " ${cmd} " ]]; then
    ${commands[$cmd]}
  else
    printf "\e[31mUnknown command $cmd.\e[0m\n"
  fi
  exit 0
fi

printf "> "
while read command
do
  if ! [ -z "$command" ]; then
    if [ $command = "exit" ]; then
      break
    fi

    if [[ " ${commandsKey[@]} " =~ " ${command} " ]]; then
      ${commands[$command]}
    else
      printf "\e[31mUnknown command $command.\e[0m\n"
    fi
  fi

  printf "> "
done

exit 0