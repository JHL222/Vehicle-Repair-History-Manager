/*
Copyright IBM Corp. 2016 All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

		 http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package main

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type Vehicle struct {
	ID            string `json:"id"`
	Owner         string `json:"owner"`
	Registration  string `json:"registration"`
	Manufacturing string `json:"manufacturing"`
}

type VehicleRecord struct {
	VehicleID    string  `json:"vehicleID"`
	RepairDate   string  `json:"repairDate"`
	RepairDetail string  `json:"repairDetail"`
	Cost         float64 `json:"cost"`
}

type VehicleContract struct {
	contractapi.Contract
}

func (mc *VehicleContract) RegisterVehicle(ctx contractapi.TransactionContextInterface, id string, owner string, registration string, manufacturing string) error {
	existing, err := ctx.GetStub().GetState(id)
	if err != nil {
		return fmt.Errorf("failed to read from world state: %v", err)
	}
	if existing != nil {
		return fmt.Errorf("the vehicle with ID %s already exists", id)
	}

	vehicle := Vehicle{
		ID:            id,
		Owner:         owner,
		Registration:  registration,
		Manufacturing: manufacturing,
	}

	vehicleJSON, err := json.Marshal(vehicle)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(id, vehicleJSON)
}

func (mc *VehicleContract) GetVehicle(ctx contractapi.TransactionContextInterface, id string) (*Vehicle, error) {
	vehicleJSON, err := ctx.GetStub().GetState(id)
	if err != nil {
		return nil, fmt.Errorf("failed to read from world state: %v", err)
	}
	if vehicleJSON == nil {
		return nil, fmt.Errorf("the vehicle with ID %s does not exist", id)
	}

	var vehicle Vehicle
	err = json.Unmarshal(vehicleJSON, &vehicle)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal vehicle JSON: %v", err)
	}

	return &vehicle, nil
}

// 차량의 정비 이력을 추가하는 함수
func (mc *VehicleContract) AddVehicleRecord(ctx contractapi.TransactionContextInterface, vehicleID string, repairDate string, repairDetail string, cost float64) error {
	record := VehicleRecord{
		VehicleID:    vehicleID,
		RepairDate:   repairDate,
		RepairDetail: repairDetail,
		Cost:         cost,
	}

	// JSON 형태로 변환
	recordJSON, err := json.Marshal(record)
	if err != nil {
		return fmt.Errorf("failed to marshal record JSON: %v", err)
	}

	// 레코드를 상태 데이터베이스에 저장
	err = ctx.GetStub().PutState(vehicleID+"-"+repairDate, recordJSON)
	if err != nil {
		return fmt.Errorf("failed to put state: %v", err)
	}

	return nil
}

// 특정 차량의 정비 이력을 조회하는 함수
func (mc *VehicleContract) GetVehicleRecord(ctx contractapi.TransactionContextInterface, vehicleID string, repairDate string) (*VehicleRecord, error) {
	// 차량과 날짜를 결합하여 키 생성
	key := vehicleID + "-" + repairDate

	// 키에 해당하는 상태 데이터베이스 레코드 조회
	recordJSON, err := ctx.GetStub().GetState(key)
	if err != nil {
		return nil, fmt.Errorf("failed to read from world state: %v", err)
	}
	if recordJSON == nil {
		return nil, fmt.Errorf("the Vehicle record for vehicle %s on date %s does not exist", vehicleID, repairDate)
	}

	// 조회된 JSON 데이터를 VehicleRecord 구조체로 언마샬링
	var record VehicleRecord
	err = json.Unmarshal(recordJSON, &record)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal record JSON: %v", err)
	}

	return &record, nil
}

func main() {
	cc, err := contractapi.NewChaincode(new(VehicleContract))
	if err != nil {
		panic(err.Error())
	}
	if err := cc.Start(); err != nil {
		fmt.Printf("Error starting ABstore chaincode: %s", err)
	}
}
