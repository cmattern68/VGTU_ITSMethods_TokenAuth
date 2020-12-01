#!/bin/bash

function f.dbinfo() {
  ip=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' vgtu_pgsql_db)

  echo "PostgreSQL Container IP is: $ip"
  echo "PostgreSQL Container Port is: 5432"
  echo "PostgreSQL Container DB Name is: vgtu"
  echo "PostgreSQL Container Username is: vgtu_usr"
  echo "PostgreSQL Container Password is: 3fhsutbcqJr7GPTy"
}