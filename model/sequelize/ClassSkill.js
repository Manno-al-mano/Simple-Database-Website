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
                msg: "Pole jest wymagane"
            }
        }
    },
    Umiejetnosci_ID_Umiejetnosci: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    },
    Maksymaln_Wartosc: {
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
    Bazowa_Wartosc: {
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
                args: [0],
                msg: "Pole musi być większe lub równe 0"

            },
            max: {
                args: 100,
                msg: "Pole musi być mniejsze lub równe 100"
            },
            beforeMax(value){
                if(parseInt(this.Maksymaln_Wartosc)<parseInt(value)){
                    throw new Error("Pole musi być niższe od wartości maksymalnej");
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

