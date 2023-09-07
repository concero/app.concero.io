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
            addressPatterns: ["^(0x)[0-9A-Fa-f]{40}$"],
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
            if (!mergedChain?.providers?.rango) {
                mergedChain.providers.rango = {key: rangoChain.name};
            }
        } else {
            const mergedChain = {
                id: rangoChain.chainId,
                name: rangoChain.name,
                symbol: rangoChain.name,
                logoURI: rangoChain.logo,
                addressPatterns: rangoChain.addressPatterns,
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
