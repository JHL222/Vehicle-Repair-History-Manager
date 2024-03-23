const express = require('express');
const app = express();
const path = require('path');
const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');

const PORT = 8001;
const HOST = 'localhost';
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ccpPath = path.resolve(__dirname, '..', 'connection-org1.json');
const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
const walletPath = path.join(process.cwd(), '..', 'wallet');

let sdk = require('./sdk');

async function connectToGateway() {
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });
    return gateway;
}

app.post('/registerVehicle', async (req, res) => {
    try {
        const { id, owner, registration, manufacturing } = req.body;
        const gateway = await connectToGateway();
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
        const gateway = await connectToGateway();
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
        const gateway = await connectToGateway();
        const network = await gateway.getNetwork('channel1');
        const contract = network.getContract('abstore');
        await contract.submitTransaction('AddVehicleRecord', vehicleID, repairDate, repairDetail, cost);
        res.json({ success: true, message: 'Vehicle record added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.get('/getVehicleRecord/:vehicleID/:repairDate', async (req, res) => {
    try {
        const { vehicleID, repairDate } = req.params;
        const gateway = await connectToGateway();
        const network = await gateway.getNetwork('channel1');
        const contract = network.getContract('abstore');
        const record = await contract.evaluateTransaction('GetVehicleRecord', vehicleID, repairDate);
        res.json(JSON.parse(record.toString()));
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.use(express.static(path.join(__dirname, '../client')));
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
