const Sequelize = require ('sequelize');
const  sequelize = require('../../config/sequelize/sequelize');

const Skill = sequelize.define('Skill', {
    ID_Umiejetnosci: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    Nazwa: {
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
    MinimalnyPoziomPostaci: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate:{
           isNumeric:{
                msg: "Pole musi być liczbą"
            },
            isInt:{
                msg: "Pole musi być liczbą całkowitą"
            },
            min: {
                args: 1,
                msg:"Pole musi być conajmniej 1"

            },
            max:{
                args:500,
                msg:"Pole musi być maksymalnie 500"
            }
        }
    },
    Opis: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                msg: "Pole jest wymagane"
            },
            len: {
                args:[10,150],
                msg: "Pole powinno zawierać od 10 do 150 znaków"
            }
        }
    }
});
module.exports = Skill;