const express = require('express');
const createOctokit = require('../github/octokitClient');
const { getRepositories, fetchReadme } = require('../github/githubData');

const router = express.Router();

router.get('/repositories', async (req, res, next) => {
    const octokit = createOctokit();
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

router.get('/readme/:username?', async (req, res, next) => {
    const { username } = req.params;
    const githubUsername = username || process.env.GITHUB_USERNAME;

    try {
        const readme = await fetchReadme(githubUsername, req.cache);
        res.send(readme);
    } catch (error) {
        next(error);
    }
});

module.exports = router;