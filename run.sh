#!/bin/bash

if [ ! -f cert.pem ]; then
    echo "Generating development certificates..."
    ./gen_certs.sh
fi

# Kill tsc when this script exits.
trap 'kill $(jobs -p)' EXIT

./node_modules/.bin/tsc --watch &

go run ./cmd/devserver