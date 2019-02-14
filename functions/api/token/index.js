const futballcardsService = require('../../services/futballcards.contract.service');

const token = require('express').Router();

token.get('/pointers', async (req, res, next) => {
    try {
        const network = req.params.network;

        const pointers = await futballcardsService.tokenPointers(network);
        console.log(pointers);

        return res.status(200).json(pointers);
    } catch (e) {
        next(e);
    }
});

token.get('/:tokenId', async (req, res, next) => {
    try {
        const tokenId = req.params.tokenId;
        const network = req.params.network;

        const pointers = await futballcardsService.tokenDetails(network, tokenId);
        console.log(pointers);

        return res.status(200).json(pointers);
    } catch (e) {
        next(e);
    }
});

module.exports = token;
