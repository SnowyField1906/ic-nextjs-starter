#!/usr/bin/env bash

echo -e "\n\n===== STARTED CANDID GENERATION ====="

ABSOLUTE_SCRIPT_PATH=$(realpath $0)
CANISTER_ROOT=$(dirname $ABSOLUTE_SCRIPT_PATH)/../canisters

echo "CANISTER_ROOT: $CANISTER_ROOT"

function generate_did() {
    local canister=$1


    cargo build --manifest-path="$CANISTER_ROOT/$canister/Cargo.toml" \
    --target wasm32-unknown-unknown \
    --release --package "$canister" \

    candid-extractor "target/wasm32-unknown-unknown/release/$canister.wasm" > "$CANISTER_ROOT/$canister/index.did"
}

# The list of folders from `canisters` directory
# separated by comma
CANISTERS=$(ls $CANISTER_ROOT | tr '\n' ',')

echo "CANISTERS: $CANISTERS"

for canister in $(echo $CANISTERS | sed "s/,/ /g")
do
    generate_did "$canister"
done

echo -e "===== FINISHED CANDID GENERATION =====\n\n"