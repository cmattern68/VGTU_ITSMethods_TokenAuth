#!/bin/sh

npm rebuild

sequelize db:migrate
sequelize db:seed:all
npm run dev