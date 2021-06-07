const Sequelize = require('sequelize');
const connection = require('./data');

const Admin = connection.define('administradores', {
    nameAdmin: {
        type: Sequelize.STRING,
        allowNull: false
    },

    emailAdmin: {
        type: Sequelize.STRING,
        allowNull: false
    },

    passwordAdmin: {
        type: Sequelize.STRING,
        select: false,
        allowNull: false
    }
})


Admin.sync({ force: false }).then(() => {
    console.log("Tabela Criada")
});

module.exports = Admin













