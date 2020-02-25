const node_env = process.env.NODE_ENV
require('custom-env').env(node_env);

module.exports = {
    dialect: 'postgres',
    host: process.env.DB_HOST || 'ec2-184-72-235-159.compute-1.amazonaws.com',
    port: process.env.DB_PORT || 5432,
    username: process.env.POSTGRES_USER || 'xhrotatryfzirg',
    password: process.env.POSTGRES_PASSWORD || 'a98dd73fae4b60ad527ed8f8a85a87ccb5d882349c64ea61920ecc6e0c5f6bb0',
    database: process.env.DB_NAME || 'df89ln4n2j55it',
    define: {
        timestamps: true,
        underscored: true,
    },
};