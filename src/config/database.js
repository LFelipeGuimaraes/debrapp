const node_env = process.env.NODE_ENV
// require('custom-env').env(node_env);

module.exports = {
    dialect: 'postgres',
    host: process.env.DB_HOST || 'tuffi.db.elephantsql.com ',
    port: process.env.DB_PORT || 5432,
    username: process.env.POSTGRES_USER || 'wgeuaymc',
    password: process.env.POSTGRES_PASSWORD || 'cmyKErzcCAI082TwTQRXx6NwmDG8-Krt',
    database: '	wgeuaymc',
    define: {
        timestamps: true,
        underscored: true,
    },
};