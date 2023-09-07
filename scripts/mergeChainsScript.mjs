import fs from 'fs';
import {lifiChains} from "./lifiChains.mjs";
import {rangoChains} from "./rangoChains.mjs";

const mergeChains = () => {
    let mergedChains = [];

    lifiChains.forEach(lifiChain => {
        const mergedChain = {
            id: lifiChain.id,
            name: lifiChain.name,
            symbol: lifiChain.symbol,
            logoURI: lifiChain.logoURI,
            providers: {
                lifi: {
                    key: lifiChain.symbol,
                },
            }
        }
        mergedChains.push(mergedChain);
    });

    rangoChains.forEach(rangoChain => {
        const mergedChain = mergedChains.find(mergedChain => mergedChain.id?.toString() === rangoChain.chainId.toString());
        if (mergedChain) {
            mergedChain.providers.rango = {key: rangoChain.name};
        } else {
            const mergedChain = {
                id: rangoChain.chainId,
                name: rangoChain.name,
                symbol: rangoChain.name,
                logoURI: rangoChain.logo,
                providers: {
                    rango: {
                        key: rangoChain.name,
                    },
                }
            }
            mergedChains.push(mergedChain);
        }
    });

    return mergedChains;
}

const mergedChains = mergeChains();
const mergedChainsString = `export const chains = ${JSON.stringify(mergedChains, null, 4)};\n`;
fs.writeFileSync('chains.ts', mergedChainsString, 'utf-8');

console.log('Merged chains data has been written to chains.ts');
