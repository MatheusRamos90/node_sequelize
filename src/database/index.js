const Sequelize = require('sequelize');
const dbConfig = require('../config/database.js');

const User = require('../models/User.js');
const Address = require('../models/Address.js');
const Tech = require('../models/Tech.js');

const connection = new Sequelize(dbConfig);

User.init(connection);
Address.init(connection);
Tech.init(connection);

User.associate(connection.models); // passar todos os models aqui para associação de chaves estrangeiras
Address.associate(connection.models);
Tech.associate(connection.models);

module.exports = connection;