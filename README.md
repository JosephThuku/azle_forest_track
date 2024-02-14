# Timber Tracking Canister

This canister is designed to track timber from the forest to the market, ensuring it is not from illegal logging and not sourced from protected forests.

## Features

- Forest Service Officer can log trees.
- Timber Merchant can log timber.
- Forest Service Officer can query trees.
- Timber Merchant can query timber.

## Installation

Run the following commands individually following the instructions in the comments:

```bash
npx azle new hello_world
cd hello_world

# Ubuntu build dependencies
sudo apt install clang
sudo apt install build-essential
sudo apt install libssl-dev
sudo apt install pkg-config

# Mac build dependencies
xcode-select --install
brew install llvm

# The dfx command line tools for managing ICP applications
DFX_VERSION=0.16.1 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
dfx start --clean --host 127.0.0.1:8000

# In a separate terminal in the hello_world directory
npm install
dfx deploy

# If you have problems deploying see https://demergent-labs.github.io/azle/deployment.html#common-deployment-issues

For troubleshooting during deployment, refer to [common deployment issues](https://demergent-labs.github.io/azle/deployment.html#common-deployment-issues).
```
## How to Contribute

To contribute to this project:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'Add your feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

## Code Structure

The code implements a Canister for log tracking and tree planting, designed for use by Kenyan timber merchants and forest service. Key functionalities include logging trees, querying trees and timber, updating timber status, and ensuring legal sourcing.

