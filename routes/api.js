const express = require('express');
const { Octokit } = require('@octokit/rest');
const { getRepositories, fetchReadme } = require('../github/githubData');
require('dotenv').config();

const router = express.Router();
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

router.get('/repositories', async (req, res, next) => {
    const cacheKey = 'repositories';
    try {
        let repositories = req.cache.get(cacheKey);

        if (!repositories) {
            console.log('Fetching repositories from GitHub');
            repositories = await getRepositories(octokit, req.cache);
            req.cache.set(cacheKey, repositories);
        } else {
            console.log('Fetching repositories from cache');
        }
        res.json(repositories);
    } catch (error) {
        next(error);
    }
});

router.get('/readme/:username', async (req, res, next) => {
    const { username } = req.params || process.env.GITHUB_USERNAME;
    try {
        const readme = await fetchReadme(username, req.cache);
        res.send(readme);
    } catch (error) {
        next(error);
    }
});

module.exports = router;