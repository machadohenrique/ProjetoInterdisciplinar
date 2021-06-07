const Sequelize = require('sequelize');

const connection = new Sequelize('gamespi', 'gabrielh', 'henrique', {
    host: 'mysql743.umbler.com',
    dialect: 'mysql'
})

module.exports = connection;
