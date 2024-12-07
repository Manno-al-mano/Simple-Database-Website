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
        allowNull: false,
        foreignKey: true,
        validate: {
            notEmpty: {
                msg: "validationMessage.fieldRequired"
            }
        }
    },
    Umiejetnosci_ID_Umiejetnosci: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        validate: {
            notEmpty: {
                msg: "validationMessage.fieldRequired"
            }
        }
    },
    Maksymaln_Wartosc: {
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
    Bazowa_Wartosc: {
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
                args: [0],
                msg: "validationMessage.isInRange0to100"

            },
            max: {
                args: 100,
                msg: "validationMessage.isInRange0to100"
            },
            beforeMax(value){
                if(parseInt(this.Maksymaln_Wartosc)<parseInt(value)){
                    throw new Error("validationMessage.isHigherThanMax");
                }
            }
        }
    }
},
    {
indexes: [{
    unique:true,
    fields:['Umiejetnosci_ID_Umiejetnosci','Klasy_ID_Klasy']
}
]
});
module.exports = ClassSkill;

