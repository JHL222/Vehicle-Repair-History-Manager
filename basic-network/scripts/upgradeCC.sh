#!/bin/bash

## 파라미터가 없으면 종료
if [ "$#" -lt 1 ]; then
   echo "$# is Illegal number of parameters."
   echo "Usage: $0 [options]"
 exit 1
fi

## 체인코드 빌드
echo "체인코드 빌드"
cd ./chaincode/${1}/go/
go build

## 체인코드 패키지화
echo "체인코드 패키지화"
cd /opt/gopath/src/github.com/hyperledger/fabric/peer
peer lifecycle chaincode package ${1}_${2}.tar.gz \
 --path ./chaincode/${1}/go/ \
 --lang golang \
 --label "${1}_${2}"

echo "Org1 peer0 체인코드 설치"
## Org1 체인코드 설치
peer lifecycle chaincode install ${1}_${2}.tar.gz

## 체인코드 패키지 이름 환경변수 지정
peer lifecycle chaincode queryinstalled >&log.txt
export PACKAGE_ID=`sed -n '/Package/{s/^Package ID: //; s/, Label:.*$//; $p;}' log.txt`
export SEQ=`sed -n '/'${1}'_/p' log.txt | wc -l`

echo "packgeID=$PACKAGE_ID"
echo "sequence=$SEQ"

echo "체인코드 승인"
## 체인코드 승인(approve)
peer lifecycle chaincode approveformyorg \
 -o orderer.example.com:7050 \
 --ordererTLSHostnameOverride orderer.example.com \
 --tls \
 --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem \
 --channelID channel1 \
 --name ${1} \
 --version ${2} \
 --package-id ${PACKAGE_ID} \
 --sequence ${SEQ}

echo "체인코드 커밋"
## 체인코드 Commit
peer lifecycle chaincode commit \
 -o orderer.example.com:7050 \
 --ordererTLSHostnameOverride orderer.example.com \
 --tls \
 --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem \
 --channelID channel1 \
 --name ${1} \
 --peerAddresses peer0.org1.example.com:7051 \
 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt \
 --version ${2} \
 --sequence ${SEQ}
