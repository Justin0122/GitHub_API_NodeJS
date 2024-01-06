const express = require('express');
const routes = require('./routes/api');
const errorHandler = require('./errorHandler');
const setupCors = require('./middlewares/setupCors');
const { createCache } = require('./utils/cache');
require('dotenv').config();

const app = express();
const cache = createCache();

app.use(setupCors);
app.use('/api', (req, res, next) => {
    req.cache = cache;
    next();
}, routes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
