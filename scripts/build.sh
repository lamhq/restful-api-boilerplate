#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Active the CI environment
export CI=true

# Define path to the build directory
BUILD_DIR=dist

# remove build directory
rm -rf ${BUILD_DIR}

# Transpile source code
tsc
echo "Code compiled successfully"

# Install production dependencies inside a docker container
podman run --rm \
  -v $(pwd):/app \
  -w /app \
  --entrypoint sh public.ecr.aws/lambda/nodejs:20 \
  -c "./scripts/install-deps.sh"
echo "Runtime dependencies installed"

echo "Build successfully."
