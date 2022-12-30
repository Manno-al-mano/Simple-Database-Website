const Sequelize = require ('sequelize');
const  sequelize = require('../../config/sequelize/sequelize');

const Class = sequelize.define('Class', {
        ID_Klasy: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        Nazwa_Klasy: {
            type: Sequelize.STRING,
            allowNull: false,
            validate:{
                notEmpty:{
                   msg: "Pole jest wymagane"
                },
                len: {
                    args:[2,30],
                    msg: "Pole powinno zawierać od 2 do 30 znaków"
                }
            }
        },
        Maksymalny_Poziom: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty:{
                    msg: "Pole jest wymagane"
                },
                isNumeric:{
                    msg: "Pole musi być liczbą"
                },
                isInt:{
                    msg: "Pole musi być liczbą całkowitą"
                },
                min: {
                    args: 5,
                    msg:"Pole musi być większe od 5"

}

            }
        },
        Data_Utworzenia: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });
module.exports = Class;