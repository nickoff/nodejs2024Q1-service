#!/bin/sh

FLAG_PATH=/app/migration_done.flag

if [ ! -f $FLAG_PATH ]; then
  npm run migration:generate
  npm run migration:run

  touch $FLAG_PATH
fi

npm run start:dev
