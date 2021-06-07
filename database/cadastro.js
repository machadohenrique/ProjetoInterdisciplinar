const Sequelize = require('sequelize');
const connection = require('./data');

const User = connection.define('usuario', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false
    },

    password: {
        type: Sequelize.STRING,
        select: false,
        allowNull: false
    }


})

User.sync({ force: false }).then(() => {
    console.log("Tabela Criada")
});

module.exports = User;