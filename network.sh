#!/bin/bash

function generateCert() {
 # 인증서 dev 모드 생성
 basic-network/scripts/generateCert.sh
}

function runCAdev() {
 # CA dev 생성
 basic-network/scripts/runCAdev.sh
}

function cleanNetwork() {
 # 네트워크 전부 삭제
 basic-network/scripts/cleanNetwork.sh
}

function upNetwork() {
 # 네트워크 실행
 basic-network/scripts/upNetwork.sh $1 $2 $3 $4 $5 $6
}
function createConfigtxgen() {
 # 채널 정보 생성
 basic-network/scripts/createConfigtxgen.sh
}

function joinChannel() {
 # 채널 트랜잭션 네트워크 등록
 docker exec cli scripts/joinChannel.sh $1 $2 $3 $4
}

function installCC() {
 # 체인코드 설치
 docker exec cli scripts/installCC.sh $1 $2 $3 $4
}

function checkCC() {
 # 체인코드 현황
 docker exec cli scripts/checkCC.sh $1
}

function startSDK() {
 # SDK 실행
 basic-network/scripts/startSDK.sh
}

function upgradeCC() {
 # 체인코드 업그레이드
 docker exec cli scripts/upgradeCC.sh $1 $2
}
if [ "$1" == "generateCert" ]; then
 generateCert org1peer0 orderer
elif [ "$1" == "createConfigtxgen" ]; then
 createConfigtxgen
elif [ "$1" == "upNetwork" ]; then
 upNetwork org1peer0 orderer
elif [ "$1" == "createChannel" ]; then
 joinChannel createChannel
elif [ "$1" == "joinChannel" ]; then
 joinChannel joinChannel
elif [ "$1" == "updateAnchor" ]; then
 joinChannel updateAnchor
elif [ "$1" == "installCC" ]; then
 installCC $2
elif [ "$1" == "checkCC" ]; then
 checkCC $2
elif [ "$1" == "runCAdev" ]; then
 runCAdev
elif [ "$1" == "startSDK" ]; then
 startSDK
elif [ "$1" == "upgradeCC" ]; then
 upgradeCC $2 $3
elif [ "$1" == "clean" ]; then
 cleanNetwork
elif [ "$1" == "start" ]; then
 generateCert
 sleep 2
 createConfigtxgen
 sleep 2
 upNetwork org1peer0 orderer
 sleep 2
 joinChannel createChannel
 joinChannel joinChannel
 joinChannel updateAnchor
 sleep 2
 runCAdev
else
 echo -n "unknown parameter"
 exit 1
fi

