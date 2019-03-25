const _ = require('lodash');
const Eth = require('ethjs');

const {INFURA_KEY} = require('../constants');

function getHttpProviderUri(network) {
    if (_.toNumber(network) === 5777) {
        return 'http://127.0.0.1:7545'; // a.k.a. truffle
    }
    return `https://${getNetwork(network)}.infura.io/v3/${INFURA_KEY}`;
}

const networkSplitter = (network, {ropsten, rinkeby, mainnet, local}) => {
    switch (network) {
        case 1:
        case '1':
        case 'mainnet':
            return mainnet;
        case 3:
        case '3':
        case 'ropsten':
            return ropsten;
        case 4:
        case '4':
        case 'rinkeby':
            return rinkeby;
        case 5777:
        case '5777':
        case 'local':
            // This may change if a clean deploy
            return local;
        default:
            throw new Error(`Unknown network ID ${network}`);
    }
};

const getNetwork = (network) => {
    return networkSplitter(network, {
        mainnet: 'mainnet',
        ropsten: 'ropsten',
        rinkeby: 'rinkeby',
        local: 'local'
    });
};

const getTokenAddressForNetwork = (network) => {
    return networkSplitter(network, {
        mainnet: '0x0',
        ropsten: '0x0',
        rinkeby: '0x0',
        local: '0x194bAfbf8eb2096e63C5d9296363d6DAcdb32527'
    });
};


const getHeadToHeadAddressForNetwork = (network) => {
    return networkSplitter(network, {
        mainnet: '0x0',
        ropsten: '0x0',
        rinkeby: '0x0',
        local: '0xe39f3f7361512de3aBd7cB264efd42D22A4B11C7'
    });
};

const getMarketplaceAddressForNetwork = (network) => {
    return networkSplitter(network, {
        mainnet: '0x0',
        ropsten: '0x0',
        rinkeby: '0x0',
        local: '0xccFdbA3880d42a0De4c7407631a0066EE61996aA'
    });
};

const connectToToken = (network) => {
    return new Eth(new Eth.HttpProvider(getHttpProviderUri(network)))
        .contract(require('./abi/futballcards.abi'))
        .at(getTokenAddressForNetwork(network));
};

const connectToMarketplace = (network) => {
    return new Eth(new Eth.HttpProvider(getHttpProviderUri(network)))
        .contract(require('./abi/buyNowMarkeplace.abi'))
        .at(getMarketplaceAddressForNetwork(network));
};

const connectToHeadToHeadGame = (network) => {
    return new Eth(new Eth.HttpProvider(getHttpProviderUri(network)))
        .contract(require('./abi/headToHead.abi'))
        .at(getHeadToHeadAddressForNetwork(network));
};

const ethjsProvider = (network) => {
    return new Eth(new Eth.HttpProvider(getHttpProviderUri(network)));
};

module.exports = {
    ethjsProvider,
    connectToToken,
    connectToHeadToHeadGame,
    connectToMarketplace
};
