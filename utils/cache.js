const NodeCache = require('node-cache');

function createCache() {
    return new NodeCache({ stdTTL: 7200 }); // Cache for 2 hours (in seconds)
}

module.exports = {
    createCache,
};
