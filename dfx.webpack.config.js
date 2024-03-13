const path = require('path')
const replace = require('replace-in-file')

// TODO: why this is called twice?
const initCanisterIds = () => {
    let localCanisters, prodCanisters, canisters

    console.info('\n\n===== STARTED DFX CONFIGURATION =====')

    // Loading canisters
    try {
        localCanisters = require(
            path.resolve('.dfx', 'local', 'canister_ids.json')
        )
    } catch (error) {
        console.info('No local canister_ids.json found. Continuing production')
    }

    try {
        prodCanisters = require(path.resolve('canister_ids.json'))
    } catch (error) {
        console.info(
            'No production canister_ids.json found. Continuing with local'
        )
    }

    // Checking network

    const network = process.env.DFX_NETWORK
    console.info(`export DFX_NETWORK=${process.env.DFX_NETWORK}`)

    // Setting environment variables for canisters
    canisters = network === 'local' ? localCanisters : prodCanisters
    for (const canister in canisters) {
        const canisterId = `NEXT_PUBLIC_CANISTER_ID_${canister.toUpperCase()}`

        process.env[canisterId] = canisters[canister][network]

        console.info(`export ${canisterId}=${canisters[canister][network]}`)
    }

    // Replace all `process.env.CANISTER_ID_*` with `process.env.NEXT_PUBLIC_CANISTER_ID*`
    // in `./src/declarations/*/*.js` directory
    const options1 = {
        files: './src/declarations/*/index.js',
        from: /process.env.CANISTER_ID_/g,
        to: 'process.env.NEXT_PUBLIC_CANISTER_ID_',
    }

    // Remove all ```
    //  ||
    // process.env.HELLO_WORLD_CANISTER_ID;
    // ``` in `./src/declarations/*/*.js` directory
    const options2 = {
        files: './src/declarations/*/index.js',
        from: /\|\|\n  process.env.*_CANISTER_ID;/g,
        to: '',
    }

    const result1 = replace.sync(options1)
    const result2 = replace.sync(options2)

    // get unique files from result.file
    const files = [
        ...new Set([...result1, ...result2].map((result) => result.file)),
    ]
    console.info(`Modified file(s): ${files}`)

    console.info('===== FINISHED DFX CONFIGURATION =====\n\n')
}

module.exports = {
    initCanisterIds: initCanisterIds,
}
