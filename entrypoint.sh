#!/usr/bin/env sh

set -e

if [ -z "$MEDIRAD_ALBUM_ID" ]
then
    echo "\$MEDIRAD_ALBUM_ID must be declared"
else
    npm start $MEDIRAD_ALBUM_ID
fi