'use strict';

var app = angular.module('vehicleApp', []);

app.controller('VehicleController', function($scope, VehicleService) {
    $scope.registerVehicle = function() {
        var vehicle = {
            id: $scope.id,
            owner: $scope.owner,
            registration: $scope.registration,
            manufacturing: $scope.manufacturing
        };
        VehicleService.registerVehicle(vehicle).then(function(response) {
            console.log(response.data);
            alert(response.data.message);
        }, function(error) {
            console.error('Error registering vehicle:', error);
            alert('Error registering vehicle. Please check console for details.');
        });
    };

    $scope.getVehicle = function(id) {
        VehicleService.getVehicle(id).then(function(response) {
            $scope.vehicle = response.data;
        }, function(error) {
            console.error('Error getting vehicle:', error);
            alert('Error getting vehicle. Please check console for details.');
        });
    };

    $scope.addVehicleRecord = function() {
        var record = {
            vehicleID: $scope.vehicleID,
            repairDate: $scope.repairDate,
            repairDetail: $scope.repairDetail,
            cost: $scope.cost
        };
        VehicleService.addVehicleRecord(record).then(function(response) {
            console.log(response.data);
            alert(response.data.message);
        }, function(error) {
            console.error('Error adding vehicle record:', error);
            alert('Error adding vehicle record. Please check console for details.');
        });
    };

    $scope.getVehicleRecord = function(vehicleID, repairDate) {
        VehicleService.getVehicleRecord(vehicleID, repairDate).then(function(response) {
            $scope.record = response.data;
        }, function(error) {
            console.error('Error getting vehicle record:', error);
            alert('Error getting vehicle record. Please check console for details.');
        });
    };
});

app.factory('VehicleService', function($http) {
    var service = {};

    service.registerVehicle = function(vehicle) {
        return $http.post('/registerVehicle', vehicle);
    };

    service.getVehicle = function(id) {
        return $http.get('/getVehicle/' + id);
    };

    service.addVehicleRecord = function(record) {
        return $http.post('/addVehicleRecord', record);
    };

    service.getVehicleRecord = function(vehicleID, repairDate) {
        return $http.get('/getVehicleRecord/' + vehicleID + '/' + repairDate);
    };

    return service;
});
