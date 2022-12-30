const Sequelize = require ('sequelize');
const  sequelize = require('../../config/sequelize/sequelize');

const ClassSkill = sequelize.define('ClassSkill', {
    ID_Klasy_Umiejetnosci: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    Klasy_ID_Klasy: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Umiejetnosci_ID_Umiejetnosci: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Maksymaln_Wartosc: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Bazowa_Wartosc: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});
module.exports = ClassSkill;