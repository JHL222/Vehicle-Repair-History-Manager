
const express = require('express');
const app = express();
let path = require('path');
let sdk = require('./sdk');

const PORT = 8001;
const HOST = 'localhost';
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.post('/registerVehicle', async (req, res) => {
    try {
        const { id, owner, registration, manufacturing } = req.body;
        
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork('channel1');
        const contract = network.getContract('abstore');
        
        await contract.submitTransaction('RegisterVehicle', id, owner, registration, manufacturing);
        
        res.json({ success: true, message: 'Vehicle registered successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.get('/getVehicle/:id', async (req, res) => {
    try {
        const id = req.params.id;
        
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork('channel1');
        const contract = network.getContract('abstore');
        
        const vehicle = await contract.evaluateTransaction('GetVehicle', id);
        res.json(JSON.parse(vehicle.toString()));
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.post('/addVehicleRecord', async (req, res) => {
    try {
        const { vehicleID, repairDate, repairDetail, cost } = req.body;
        
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork('channel1');
        const contract = network.getContract('abstore');
        
        await contract.submitTransaction('AddMaintenanceRecord', vehicleID, repairDate, repairDetail, cost);
        
        res.json({ success: true, message: 'Maintenance record added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.get('/getVehicleRecord/:vehicleID/:repairDate', async (req, res) => {
    try {
        const { vehicleID, repairDate } = req.params;
        
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork('channel1');
        const contract = network.getContract('abstore');
        
        const record = await contract.evaluateTransaction('GetMaintenanceRecord', vehicleID, repairDate);
        res.json(JSON.parse(record.toString()));
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.use(express.static(path.join(__dirname, '../client')));
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
