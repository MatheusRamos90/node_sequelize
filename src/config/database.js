/**
 * @DatabaseConfiguration
 * */
const databaseConfig = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    database: 'nodesequelize',
    // schema: '',
    define: {
        timestamps: true,
        underscored: true
    }
};

module.exports = databaseConfig;

