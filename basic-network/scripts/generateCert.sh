#!/bin/bash

cd $GOPATH/src/dev-mode/basic-network
./bin/cryptogen generate --config=./organizations/cryptogen/crypto-config-org1.yaml --output=organizations
./bin/cryptogen generate --config=./organizations/cryptogen/crypto-config-orderer.yaml --output=organizations
echo "orderer.example.com"