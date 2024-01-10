function setupCors(req, res, next) {
    let allowedOrigins = [process.env.CORS_ORIGIN];
    if (allowedOrigins.includes(req.headers.origin)) {
        res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
        res.header('Access-Control-Allow-Methods', 'GET');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.header('Access-Control-Allow-Credentials', 'true');
        next();
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
}

module.exports = setupCors;
