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
                msg: "validationMessage.fieldRequired"
            },
            len: {
                args:[2,30],
                msg: "validationMessage.isInCharRange2to30"
            }
        }
    },
    MinimalnyPoziomPostaci: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate:{
           isNumeric:{
                msg: "validationMessage.isNumber"
            },
            isInt:{
                msg: "validationMessage.isInt"
            },
            min: {
                args: 1,
                msg: "validationMessage.isInRange1to500"

            },
            max:{
                args:500,
                msg:"validationMessage.isInRange1to500"
            }
        }
    },
    Opis: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                msg: "validationMessage.fieldRequired"
            },
            len: {
                args:[10,150],
                msg: "validationMessage.isInCharRange10to150"
            }
        }
    }
});
module.exports = Skill;