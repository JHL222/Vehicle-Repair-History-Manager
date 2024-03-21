#!/bin/bash

echo "CA 컨테이너 및 노드 컨테이너 삭제"
cd $GOPATH/src/dev-mode/basic-network/docker
docker-compose -f docker-compose-ca.yaml down --volumes
docker-compose -f docker-compose-test-net.yaml -f docker-compose-test-net.yaml down --volumes --remove-orphans

docker rm $(docker ps -aq)
docker rmi $(docker images dev-* -q)
docker volume prune -f
docker network prune -f

echo "프로젝트 인증서 및 트랜잭션 정보 삭제"
## 프로젝트 인증서 및 트랜잭션 정보 삭제
cd $GOPATH/src/dev-mode/basic-network
rm -fr channel-artifacts
rm -fr organizations/ordererOrganizations
rm -fr organizations/peerOrganizations
rm -fr system-genesis-block

echo "CA 관련 파일 삭제"
## CA 관련 파일 삭제
cd $GOPATH/src/dev-mode
sudo rm -rf basic-network/organizations/fabric-ca/ordererOrg
sudo rm -rf basic-network/organizations/fabric-ca/org1
sudo rm -rf basic-network/organizations/fabric-ca/org2
rm -rf application/wallet
rm -rf application/connection-org1.json
#rm -rf application/package-lock.json
#rm -rf application/node_modules

