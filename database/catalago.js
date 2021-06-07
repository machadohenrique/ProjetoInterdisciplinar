const Sequelize = require('sequelize');
const connection = require('./data');

const Jogos = connection.define('catalago', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },

    price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    },

    LaunchYear: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Jogos.sync({ force: false }).then(() => {
    console.log("Created Table")
});

module.exports = Jogos;

