const Sequelize = require ('sequelize');
const  sequelize = require('../../config/sequelize/sequelize');


const today = new Date(),
    tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
let month=''+(  tomorrow.getMonth()+1),
    day=''+     tomorrow.getDate(),
    year=       tomorrow.getFullYear();

const tomorrowString = [year,month,day].join('-');

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
            unique: true,
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
                notEmpty: {
                    msg: "Pole jest wymagane"
                },
                isNumeric: {
                    msg: "Pole musi być liczbą"
                },
                isInt: {
                    msg: "Pole musi być liczbą całkowitą"
                },
                min: {
                    args: 5,
                    msg: "Pole musi być większe lub równe 5"

                },
                max: {
                    args: 100,
                    msg: "Pole musi być mniejsze lub równe 100"
                }

            }
        },
        Data_Utworzenia: {
            type: Sequelize.DATE,
            allowNull: false,
            validate: {
                isDate: {msg: "Pole powinno zawierać datę w formacie dd.mm.yyyy"},
                isBefore: {
                    args: tomorrowString,
                    msg: "data nie może być przyszła"
                }
            }
        }
    });
module.exports = Class;