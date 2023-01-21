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
                   msg: "validationMessage.fieldRequired"//"Pole jest wymagane"
                },
                len: {
                    args:[2,30],
                    msg: "validationMessage.isInCharRange2to30"
                }
            }
        },
        Maksymalny_Poziom: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "validationMessage.fieldRequired"
                },
                isNumeric: {
                    msg: "validationMessage.isNumber"
                },
                isInt: {
                    msg: "validationMessage.isInt"
                },
                min: {
                    args: 5,
                    msg: "validationMessage.isInRange5to100"

                },
                max: {
                    args: 100,
                    msg: "validationMessage.isInRange5to100"
                }

            }
        },
        Data_Utworzenia: {
            type: Sequelize.DATE,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "validationMessage.fieldRequired"
                },
                isDate: {msg: "validationMessage.isDate"},
                isBefore: {
                    args: tomorrowString,
                    msg: "validationMessage.isFuture"
                }
            }
        }
    });
module.exports = Class;