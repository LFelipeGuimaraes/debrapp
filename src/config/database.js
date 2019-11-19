const node_env = process.env.NODE_ENV
// require('custom-env').env(node_env);

// module.exports = {
//     dialect: 'postgres',
//     host: process.env.DB_HOST || 'ec2-54-227-249-108.compute-1.amazonaws.com',
//     port: process.env.DB_PORT || '5432',
//     username: process.env.POSTGRES_USER || 'jamwzcqfgaoagp',
//     password: process.env.POSTGRES_PASSWORD || '23c65ac5c32e77280064ca03cb3f3a230208650a958b326de460f3078342516a',
//     database: 'dcf2hmbgls3v7s',
//     define: {
//         timestamps: true,
//         underscored: true,
//     },
// };

module.exports = {
    'use_env_variable': "DATABASE_URL"
}