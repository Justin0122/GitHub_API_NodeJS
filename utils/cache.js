const NodeCache = require('node-cache');

function createCache() {
    return new NodeCache({ stdTTL: 86400 }); // Cache for 24 hours (in seconds)
}

module.exports = {
    createCache,
};
