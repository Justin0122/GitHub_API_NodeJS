const { Octokit } = require('@octokit/rest');
require('dotenv').config();

function createOctokit() {
    return new Octokit({
        auth: process.env.GITHUB_TOKEN,
    });
}

module.exports = createOctokit;
