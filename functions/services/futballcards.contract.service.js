const {connectToToken, ethjsProvider} = require('./web3/networks');
const firstNames = require('./data/0/firstNames');
const lastNames = require('./data/0/lastNames');
const nationalities = require('./data/nationalities');
const positions = require('./data/positions');
const cheerioSVGService = require('./cheerioSVGService.service');

const axios = require('axios');

const lookupMetadata = async (tokenUri) => {
    const tokenMeta = await axios.get(tokenUri);
    const meta = tokenMeta.data;
    return {
        tokenUri,
        ...meta
    };
};

class FutballCardsContractService {

    async tokenBaseURI(network = 1) {
        console.log(`Find base token URI on network [${network}]`);

        const token = connectToToken(network);
        const tokenBaseURI = await token.tokenBaseURI();
        // console.log(tokenBaseURI);
        return tokenBaseURI;
    }

    async tokenPointers(network = 1) {
        console.log(network);
        const token = connectToToken(network);
        const totalCards = await token.totalCards();

        return {
            totalCards: totalCards[0]
        };
    }

    async tokenDetails(network = 1, tokenId) {
        console.log(`Find token details for [${tokenId}] on network [${network}]`);

        const token = connectToToken(network);

        // Get token attributes
        const {
            _cardType,
            _nationality,
            _position,
            _ethnicity,
            _kit,
            _colour
        } = await token.card(tokenId);

        const {
            _strength,
            _speed,
            _intelligence,
            _skill,
            _special,
            _firstName,
            _lastName
        } = await token.attributesAndName(tokenId);

        const {
            _badge,
            _sponsor,
            _number,
            _boots
        } = await token.extras(tokenId);

        const owner = await token.ownerOf(tokenId);

        return {
            cardType: _cardType.toNumber(),
            nationality: _nationality.toNumber(),
            position: _position.toNumber(),
            ethnicity: _ethnicity.toNumber(),
            kit: _kit.toNumber(),
            colour: _colour.toNumber(),
            strength: _strength.toNumber(),
            speed: _speed.toNumber(),
            intelligence: _intelligence.toNumber(),
            skill: _skill.toNumber(),
            attributeAvg: Math.floor((_strength.toNumber() + _speed.toNumber() + _intelligence.toNumber() + _skill.toNumber()) / 4),
            special: _special.toNumber(),
            firstName: _firstName.toNumber(),
            lastName: _lastName.toNumber(),
            badge: _badge.toNumber(),
            sponsor: _sponsor.toNumber(),
            number: _number.toNumber(),
            boots: _boots.toNumber(),
            fullName: `${firstNames[_firstName.toNumber()]} ${lastNames[_lastName.toNumber()]}`,
            nationalityText: `${nationalities[_nationality.toNumber()]}`,
            positionText: `${positions[_position.toNumber()]}`,
            owner: owner[0],
            tokenId: tokenId,
        };
    }

    async accountTokenDetails(network = 1, address) {
        console.log(`Get account token details [${address}] on network [${network}]`);

        const token = connectToToken(network);

        const tokens = await token.tokensOfOwner(address);

        return {
            tokenIds: tokens[0].map(id => id.toNumber())
        };
    }

    async contractInfo(network = 1) {
        console.log(`Get contract info on network [${network}]`);

        const token = connectToToken(network);

        const totalSupply = await token.totalSupply();
        const symbol = await token.symbol();
        const name = await token.name();

        return {
            totalSupply: totalSupply[0].toNumber(),
            symbol: symbol[0],
            name: name[0]
        };
    }
}

module.exports = new FutballCardsContractService();
