#!/bin/bash

cd $GOPATH/src/dev-mode/basic-network

export FABRIC_CFG_PATH=${PWD}/configtx/

echo "제네시스 블록 및 채널 파일 생성"
./bin/configtxgen -profile DevOrdererGenesis -channelID system-channel -outputBlock ./system-genesis-block/genesis.block
./bin/configtxgen -profile DevChannel -outputCreateChannelTx ./channel-artifacts/channel.tx -channelID channel1