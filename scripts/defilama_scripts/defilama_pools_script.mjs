import fs from 'fs';
import {pools} from "./pools.mjs";

const getPools = () => {
    let newPools = [];

    pools.data.forEach(pool => {
        const handledPool = {
            id: pool.pool,
            chain: pool.chain,
            project: pool.project,
            symbol: pool.symbol,
            underlyingTokens: pool.underlyingTokens,
        }

        newPools.push(handledPool);
    });

    return newPools;
}

const newPools = getPools();
const poolsString = `export const pools = ${JSON.stringify(newPools, null, 4)};\n`;
fs.writeFileSync('pools.js', poolsString, 'utf-8');
