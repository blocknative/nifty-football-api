const _ = require('lodash');

const futballcardsService = require('../../services/contracts/futballcards.contract.service');

const eventsStoreService = require('../../services/data/eventsStore.service');

const token = require('express').Router({mergeParams: true});

token.get('/pointers', async (req, res, next) => {
    try {
        const network = req.params.network;

        const pointers = await futballcardsService.tokenPointers(network);

        return res.status(200).json(pointers);
    } catch (e) {
        next(e);
    }
});

token.get('/rankings', async (req, res, next) => {
    console.log(`RANKINGS`);
    try {
        const network = req.params.network;

        const data = await eventsStoreService.cardRankings(network);

        return res.status(200).json(data);
    } catch (e) {
        next(e);
    }
});

token.get('/:tokenId', async (req, res, next) => {
    try {
        const tokenId = req.params.tokenId;
        const network = req.params.network;

        const tokenDetails = await futballcardsService.tokenDetails(network, tokenId);

        return res.status(200).json(tokenDetails);
    } catch (e) {
        next(e);
    }
});

token.get('/account/:address', async (req, res, next) => {
    try {
        const address = req.params.address;
        const network = req.params.network;

        const {tokenIds} = await futballcardsService.accountTokenDetails(network, address);

        const tokenDetails = await Promise.all(_.map(tokenIds, (tokenId) => {
            return futballcardsService.tokenDetails(network, tokenId);
        }));

        return res.status(200).json({
            tokenIds,
            tokenDetails
        });
    } catch (e) {
        next(e);
    }
});

token.get('/tokens/:address', async (req, res, next) => {
    try {
        const address = req.params.address;
        const network = req.params.network;

        const {tokenIds} = await futballcardsService.accountTokenDetails(network, address);

        return res.status(200).json(tokenIds);
    } catch (e) {
        next(e);
    }
});

token.get('/contract/info', async (req, res, next) => {
    try {
        const network = req.params.network;

        const contractInfo = await futballcardsService.contractInfo(network);

        return res.status(200).json(contractInfo);
    } catch (e) {
        next(e);
    }
});

token.put('/:tokenId/average', async (req, res, next) => {
    try {
        const tokenId = req.params.tokenId;
        const network = req.params.network;

        const tokenDetails = await futballcardsService.tokenDetails(network, tokenId);

        const data = await eventsStoreService.upsertAttrsAvg(network, parseInt(tokenId), tokenDetails.attributeAvg);

        return res.status(200).json(data);
    } catch (e) {
        next(e);
    }
});

module.exports = token;
