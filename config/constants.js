const allowedOrigins = '*';

const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'].join(',');

const allowedHeaders = ['content-type', 'accept', 'authorization'].join(',');

module.exports.constants = {
    USER_UNAUTHENTICATED: 'UNAUTHENTICATED',
    USER_AUTHENTICATED: 'AUTHENTICATED',
    USER_ADMIN: 'ADMIN',
    USER_SERVICE_ACCOUNT: 'SERVICE_ACCOUNT',
    UNAUTHENTICATED_USER_AGE: 17,
    ACCESS_TOKEN_NOTFOUND: 'ACCESS_TOKEN_NOTFOUND',

    ROUTE_PREFIX: '/auth/v1',

    ALLOWED_ORIGINS: allowedOrigins,
    ALLOWED_METHODS: allowedMethods,
    ALLOWED_HEADERS: allowedHeaders,

    // user types for cookie
    ANNONYMOUS: 'ANNONYMOUS',
    NEW: 'NEW',
    RETURNING: 'RETURNING'
}