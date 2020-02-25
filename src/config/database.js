const node_env = process.env.NODE_ENV
require('custom-env').env(node_env);

module.exports = {
    dialect: 'postgres',
    host: process.env.DB_HOST || 'ec2-184-72-235-159.compute-1.amazonaws.com',
    port: process.env.DB_PORT || 5432,
    username: process.env.POSTGRES_USER || 'danpdbwlzkbidp',
    password: process.env.POSTGRES_PASSWORD || 'd4860f584e47cde8221044bd5f4ed36899e638e043e8b39237582dccff3d877e',
    database: process.env.DB_NAME || 'dfrpnssas12p8',
    define: {
        timestamps: true,
        underscored: true,
    },
    dialectOptions: {
        ssl: true,
    }
};