"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    branches: ['main'],
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        '@semantic-release/github'
    ]
};
