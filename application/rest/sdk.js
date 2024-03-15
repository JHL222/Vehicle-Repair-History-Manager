'use strict';

const { Wallets, Gateway } = require('fabric-network');
const path = require('path');
const fs = require('fs');

const channelName = 'channel1';
const chaincodeName = 'abstore';

const walletPath = path.join(process.cwd(), '..', 'wallet');
const ccpPath = path.resolve(__dirname, '..', 'connection-org1.json');
const org1UserId = 'appUser';

async function send(type, func, args, res, result){
    try {
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        const gateway = new Gateway();

        try {
            await gateway.connect(ccp, {
                wallet,
                identity: org1UserId,
                discovery: { enabled: true, asLocalhost: false }
            });
            console.log('Success to connect network');

            const network = await gateway.getNetwork(channelName);
            console.log('Success to connect channel1');
            const contract = network.getContract(chaincodeName);

            if(type){
                result = await contract.evaluateTransaction(func, ...args);
            } else {
                result = await contract.submitTransaction(func, ...args);
            }
            res.json(result.toString());

        } catch (error) {
            res.status(500).send({ error: `${error}`});
            // process.exit(1);
        } finally {
            gateway.disconnect();
        }
    } catch (error) {
        res.status(500).send({ error: `${error}`});
        // process.exit(1);
    }
}
module.exports = {
    send:send
}
