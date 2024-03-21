#!/bin/bash

cd $GOPATH/src/dev-mode/basic-network/docker

## 파라미터가 없으면 종료
if [ "$#" -lt 1 ]; then
   echo "$# is Illegal number of parameters."
   echo "Usage: $0 [options]"
 exit 1
fi
args=("$@")

echo "노드 컨테이너 실행"

export COMPOSE_PROJECT_NAME=fabric
export IMAGE_TAG=2.2.2
export SYS_CHANNEL=system-channel

for (( c=0; c<$#; c++ ))
do
 case ${args[$c]} in
   org1peer0)
     docker-compose -f docker-compose-test-net.yaml -f docker-compose-test-net.yaml up -d cli
     ;;
   orderer)
     docker-compose -f docker-compose-test-net.yaml up -d orderer.example.com
     ;;
   *)
     echo -n "unknown parameter"
     ;;
 esac
done

docker ps
