#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Enable pnpm
corepack enable
corepack prepare pnpm@9 --activate

# Define path to the package directory
PKG_DIR=dist/deps/nodejs/

# Prepare build directory
mkdir -p ${PKG_DIR}
cp package.json ${PKG_DIR}
cd ${PKG_DIR}

# Install production dependencies
pnpm i -P --no-lockfile --shamefully-hoist --ignore-scripts --package-import-method copy --store-dir /root/.pnpm-store

# clean up
rm package.json
