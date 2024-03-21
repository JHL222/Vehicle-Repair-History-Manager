#!/bin/bash

echo "node 12 버전 체크 및 프로젝트 패키지 설치"
cd $GOPATH/src/dev-mode/application

if [ ! -d "node_modules" ] ; then
 npm install
fi

echo "SDK 지갑 생성"

if [ ! -d "wallet" ] ; then
 cd $GOPATH/src/dev-mode/application/sdk
 node enrollAdmin.js
 node registUser.js
fi

cd $GOPATH/src/dev-mode/application/rest
node server.js
echo "서버 실행 명령 => node server.js"

