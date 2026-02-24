#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

npm install
npm test
npm run build
npm run preview -- --open
