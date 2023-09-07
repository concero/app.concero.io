import fs from 'fs';
import {lifiTokens} from './lifiTokens.mjs';
import {rangoTokens} from './rangoTokens.mjs';

function mergeTokens(lifiTokens, rangoTokens) {
    const mergedTokens = {};

    for (const chainId in lifiTokens) {
        const lifiChainTokens = lifiTokens[chainId];
        const mergedChainTokens = [];

        for (const token of lifiChainTokens) {
            mergedChainTokens.push({
                name: token.name,
                symbol: token.symbol,
                address: token.address,
                decimals: token.decimals,
                logoURI: token.logoURI,
                providers: [
                    "lifi"
                ]
            });
        }

        mergedTokens[chainId] = mergedChainTokens;
    }

    rangoTokens.forEach(token => {
        if (!mergedTokens[token.chainId]) {
            mergedTokens[token.chainId] = [];
        }

        const mergedToken = {
            name: token.name,
            symbol: token.symbol,
            address: token.address ? token.address : "0x0000000000000000000000000000000000000000",
            decimals: token.decimals,
            logoURI: token.image,
            providers: ["rango"]
        }

        const existingToken = mergedTokens[token.chainId].find(t => t.address === mergedToken.address);

        if (existingToken) {
            if (!existingToken.providers.includes("rango")) existingToken.providers?.push("rango");
        } else {
            mergedTokens[token.chainId].push(mergedToken);
        }
    });

    return mergedTokens;
}

const mergedTokens = mergeTokens(lifiTokens, rangoTokens);
const mergedTokensString = `export const tokens = ${JSON.stringify(mergedTokens, null, 4)};\n`;
fs.writeFileSync('tokens.ts', mergedTokensString, 'utf-8');

console.log('Merged tokens data has been written to tokens.ts');
