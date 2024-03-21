#!/bin/bash
cd $GOPATH/src/dev-mode/basic-network/docker

echo "CA 컨테이너 실행"
docker-compose -f docker-compose-ca.yaml up -d

sleep 3

cd $GOPATH/src/dev-mode/basic-network
./organizations/ccp-generate.sh

sleep 1

cd $GOPATH/src/dev-mode/application
cp -r ../basic-network/organizations/peerOrganizations/org1.example.com/connection-org1.json .
