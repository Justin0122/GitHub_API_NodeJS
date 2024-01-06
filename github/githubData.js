async function fetchReadme(GITHUB_USERNAME, cache) {
    const cacheKey = `readme_${GITHUB_USERNAME}`;

    try {
        let readme = cache.get(cacheKey);

        if (!readme) {
            console.log('Fetching readme from GitHub');
            const response = await fetch(`https://raw.githubusercontent.com/Justin0122/${GITHUB_USERNAME}/master/README.md`);
            readme = await response.text();
            cache.set(cacheKey, readme); // Cache readme
        } else {
            console.log('Fetching readme from cache');
        }

        return readme;
    } catch (error) {
        console.error('Error fetching readme:', error);
        return null; // Or handle error as needed
    }
}

async function getLanguagesForRepo(octokit, owner, repo, cache) {
    const cacheKey = `languages_${owner}_${repo}`;

    try {
        let languages = cache.get(cacheKey);

        if (!languages) {
            const languagesResponse = await octokit.request('GET /repos/{owner}/{repo}/languages', {
                owner,
                repo,
            });
            languages = { [repo]: languagesResponse.data };
            cache.set(cacheKey, languages); // Cache languages
        }

        return languages;
    } catch (error) {
        console.error(`Error fetching languages for ${owner}/${repo}:`, error);
        return { [repo]: {} };
    }
}

async function getRepositories(octokit, cache) {
    try {
        const response = await octokit.request('GET /user/repos', {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
            },
        });

        const repositories = response.data.map(repo => ({
            name: repo.name,
            description: repo.description,
            owner: repo.owner.login,
            stargazers_count: repo.stargazers_count,
            repo_url: repo.html_url,
            updated_at: repo.updated_at,
            created_at: repo.created_at,
        }));

        const myRepositories = repositories
            .filter(repo =>
                repo.owner === process.env.GITHUB_USERNAME && !repo.fork && !repo.archived && !repo.disabled && !repo.private
            )
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        const languagePromises = myRepositories.map(repo => getLanguagesForRepo(octokit, process.env.GITHUB_USERNAME, repo.name, cache));

        const languages = await Promise.all(languagePromises);

        const repoLanguages = languages.reduce((acc, cur) => ({ ...acc, ...cur }), {});

        return myRepositories.map(repo => ({
            ...repo,
            languages: repoLanguages[repo.name]
        }));

    } catch (error) {
        console.error("Error fetching repositories:", error);
        return [];
    }
}

module.exports = {
    getRepositories,
    fetchReadme,
};
