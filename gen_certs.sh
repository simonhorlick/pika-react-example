#!/bin/bash

pushd $GOROOT/src/crypto/tls
GO111MODULE=off GOBIN=$GOPATH/bin go install generate_cert.go
popd

generate_cert --host="localhost" --ecdsa-curve=P256 --ca=true
