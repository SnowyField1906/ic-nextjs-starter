# ICP

- [Homepage](https://internetcomputer.org/)
- [Internet Identity](https://identity.ic0.app)
- [Plug wallet](https://plugwallet.ooo/)
- [Quick start](https://internetcomputer.org/docs/current/home)
- [Rust canister development guide](https://internetcomputer.org/docs/current/developer-docs/backend/rust/)
- [Candid introduction](https://internetcomputer.org/docs/current/developer-docs/backend/candid/)
- [ic-sdk](https://github.com/dfinity/sdk)
- [ic-js](https://github.com/dfinity/ic-js)
- [ic-cdk](https://github.com/dfinity/cdk-rs)

Internet Computer is an open and secure **Blockchain-based Network** that can host programs and data in the form of **Smart Contracts**.

## ICP vs. Ethereum

### Smart Contracts → Canisters

In ICP, **Smart Contracts** are called **Canisters**, each consisting **Wasm bytecode** and **data storage**.

In Ethereum, trash and abandoned **Smart Contracts** are stored forever which making the network heavy. While in ICP, the **Canister** will be deleted if it runs out of **Cycles** and the deployer needs to top up the **Canister** with **Cycles** to keep it alive.

### Gas → Cycles

In Ethereum, **Gas** is used to pay for the computation and storage of the **Smart Contracts**. In ICP, **Cycles** are used to pay for the computation and storage of the **Canisters**.

Since **Cycles** are stored in the **Canister** itself, the **Canister** can pay on behalf of the user, which means the user does not need to pay for the transaction fees if needed.

**Gas** in Ethereum is unpredictable and can be manipulated by miners, while **Cycles** in ICP are predictable and be manipulated by **NNS**.

### Shards → Subnets

WHile Ethereum shards by splitting the state of the blockchain into multiple **Shards** to keep an **Node** have the same state with the whole network. ICP splits the network into multiple **Subnets** and allows each **Subnet** to communicate with each other seamlessly like **microservices** but fully on-chain. There are currently dozens of **Subnets**.

**Canisters** are hosted on **Subnets**, each **Canister** code and data is stored and executed on every **Node** in the **Subnet**.

Additionally, **Global States** on Ethereum are global while on ICP can be semi-global or private because users can interact without needing an **Account**.

### Transactions → Messages

**Transactions** in Ethereum are atomic operations that can be executed completely or reverted completely. In ICP, **Messages** are asynchronous operations that can be executed partially or reverted partially.

Besides, **Messages** can make **HTTP requests** to the outside internet.

## Architecture & Features

### IC Identity vs. IC Account

**Identity** is an authentication and authorization system for the Internet Computer. It can be used to authenticate users and authorize them to access dApps and other services on the Internet Computer. Identity needs a device having authentication capabilities such as Face ID on iPhone or Windows Hello on Windows and can be enabled multi-factor authentication.

**Account** (Wallet) is a secure and user-friendly way to manage digital assets on the Internet Computer. It can be used to store, send, and receive ICP tokens and other digital assets on the Internet Computer.

An **Identity** manages multiple **Accounts**, each Account has a unique Address and can be used to interact with canisters. User can interact with canisters only by **Identity** without Account, which means they does not need to create Wallet or pay for transaction fees but just like backend services.

### End-to-end DApps

Since **Subnets** stores **Wasm bytecode**, ICP DApps are end-to-end and can be fully on-chain, which means the front-end builds are also called a **Canister** and hosted on the **Subnet**. The deployed DApp can be accessed by the domain `https://<canister_id>.ic0.app`.

### NNS vs. SNS

Governance of ICP is accomplished through a **DAO**, which is called the **Network Nervous System (NNS)**.  
Each individual DApp on ICP can have its own governance system similar to the **NNS** by customizing and deploying an out-of-the-box tokenized DAO based on the **Service Nervous System (SNS)** for the dApp.

### Self-executable Functions vs. Deterministic-time Functions

On the ICP, **Canisters** can run like **Daemon** processes, which mean developer can configure them so that they are automatically activated by the network itself at specified block intervals. This is also called **Heartbeat Function**.

Meanwhile, **Deterministic-time Functions** are functions that can be executed at a specific time in the future, which is similar to **Cron Job**.

This enables a powerful new class of applications for *DeFi* and *GameFi*.

# About This Template

## Folder Structure

- `.dfx/`: The local configuration folder for ic-cdk
- `.next/`: The built Next.js folder
- `canisters/`: The Smart Contracts and Backend Services as Canisters
  - `hello_world/`: The example Canister in Rust
    - `src/`: The main folder contains the Smart Contracts using `ic-cdk`
      - `lib.rs`: The main file
      - `...`
    - `tests/`: The folder contains Tests using `pocket-ic`
      - `unit_test.rs`: The main file
      - `...`
    - `index.did`: The Candid file (not auto-generated)
    - `Cargo.toml`: The Rust package manager file
  - `other_canisters/`: Other Canisters in Rust
    - `...`
- `public/`: The public files for the Frontend
- `src/`: The Next.js source code for the Frontend
  - `components/`: The folder contains the React Components
  - `declarations/`: Auto-generated Canister declarations for `@dfinity/agent`
  - `helpers/`: The folder contains the helper functions
  - `pages/`: The folder contains the Next.js pages
  - `styles/`: The folder contains the CSS files
  - `...`
- `target/`: The built Canisters folder
- `out/`: The static built Frontend folder
- `dfx.json`: The is the configuration file for ic-cdk
- `dfx.webpack.config.js`: The configuration file for Canister declarations
- `.env` & `.env.local`: The environment variables for the Frontend
- `.env.icprod` & `.env.icprod.local`: The environment variables for the Canisters
- `tscofig.json` & `next.config.js` & `tailwind.config.js` & `postcss.config.js: The configuration files for Typescript, Next.js, TailwindCSS, and PostCSS
- `.eslintrc` & `.prettier.json`: The configuration files for Typescript formatter
- `rust-toolchain.toml`: The Rust version file
- `rustfmt.toml`: The configuration file for the Rust formatter
- `Cargo.toml`: The Rust package manager files for the Canisters
- `package.json`: The Node.js package manager files for the Frontend

If the source code is not formatted on save, run `cargo fmt` to format manually or follow the [official instructions](https://github.com/rust-lang/rustfmt).

## Setup

### Install DFINITY Canister SDK

**DFINITY Canister SDK** includes the `dfx` command-line tool, which we use to develop, deploy, and manage our canisters.

```bash
# Install `dfx`
sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
```

### Install Rust

**Rust** is a systems programming language that we use to write smart contracts for the ICP.

```bash
# Install `rustup`
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh

# Turn on the `nightly` toolchain
rustup override set nightly

# Install `wasm32-unknown-unknown` target
rustup target add wasm32-unknown-unknown
```

### Install PocketIC server

**PocketIC** is a local server that we use to test our canisters.

Download the latest release from the [releases page](https://github.com/dfinity/pocketic/releases).

```bash
# Unpack the file
gzip -d pocket-ic.gz

# Make the file executable
chmod +x pocket-ic

# On macOS, additionally remove the quarantine attribute
xattr -dr com.apple.quarantine pocket-ic
```

### Install packages

```bash
# Install `yarn`
npm install -g yarn

# Install the packages
yarn
```

## Running the project locally

In case we only want to run the Canister:

```bash
# Start the replica, running in the background
dfx start --clean --background

# Deploy your canisters
dfx deploy
```

In case we only want to run the Frontend:

```bash
yarn dev
```

In case we want to run both the Canister and the Frontend:

```bash
yarn dev:canister
```

Once the job completes, the application will be available at `http://localhost:4943?canisterId={asset_canister_id}`.

## Stopping the replica

Stop the replica if needed:

```bash
dfx stop
```

 In case the replica is conflicting with another process, kill it by running

```bash
lsof -i tcp:4943
```