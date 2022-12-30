const sequelize = require('./sequelize');

const Class= require('../../model/sequelize/Class');
const ClassSkill= require('../../model/sequelize/ClassSkill');
const Skill= require('../../model/sequelize/Skill');

module.exports = () => {
    Class.hasMany(ClassSkill, {
        as: 'classSkills', foreignKey: {name: 'Klasy_ID_Klasy', allowNull: false},   constraints: true, onDelete: 'CASCADE'});
    ClassSkill.belongsTo(Class, {as: 'clas', foreignKey: {name: 'Klasy_ID_Klasy', allowNull: false}});
    Skill.hasMany(ClassSkill, {
        as: 'classSkills',foreignKey: {name: 'Umiejetnosci_ID_Umiejetnosci', allowNull: false},constraints: true, onDelete: 'CASCADE'});
    ClassSkill.belongsTo(Skill,
        {as: 'skill', foreignKey: {name: 'Umiejetnosci_ID_Umiejetnosci', allowNull: false}});

    let allClasses, allSkills;
    return sequelize
        .sync({force: true})
        .then(() => {
            return Class.findAll();
        })
        .then(classes => {
            if (!classes || classes.length == 0) {
                return Class.bulkCreate([
                    {Nazwa_Klasy: 'Wojownik', Maksymalny_Poziom: 50, Data_Utworzenia: '2001-01-01'},
                    {Nazwa_Klasy: 'Arcymag', Maksymalny_Poziom: 10, Data_Utworzenia: '2005-01-21'}
                ])
                    .then(() => {
                        return Class.findAll();
                    });
            } else {
                return classes;
            }
        })
        .then(classes => {
            allClasses = classes;
            return Skill.findAll();
        })
        .then(skills => {
            if (!skills || skills.length == 0) {
                return Skill.bulkCreate([
                    {Nazwa: 'Broń Biała', MinimalnyPoziomPostaci: null, Opis: 'Jest to Walka Bronią Białą'},
                    {Nazwa: 'Magia', MinimalnyPoziomPostaci: 5, Opis: 'Jest to używanie magii'},
                    {Nazwa: 'Wysoka Magia', MinimalnyPoziomPostaci: 50, Opis: 'Jest to używanie wysokiej magii'},
                ])
                    .then(() => {
                        return Skill.findAll();
                    });
            } else {
                return skills;
            }
        })
        .then(skills => {
            allSkills = skills;
            return ClassSkill.findAll();
        })
        .then(classSkills => {
            if (!classSkills || classSkills.length == 0) {
                return ClassSkill.bulkCreate([
                    {
                        Klasy_ID_Klasy: allClasses[1].ID_Klasy,
                        Umiejetnosci_ID_Umiejetnosci: allSkills[1].ID_Umiejetnosci,
                        Maksymaln_Wartosc: 50,
                        Bazowa_Wartosc: 25
                    },
                    {
                        Klasy_ID_Klasy: allClasses[1].ID_Klasy,
                        Umiejetnosci_ID_Umiejetnosci: allSkills[2].ID_Umiejetnosci,
                        Maksymaln_Wartosc: 15,
                        Bazowa_Wartosc: 5
                    },
                    {
                        Klasy_ID_Klasy: allClasses[1].ID_Klasy,
                        Umiejetnosci_ID_Umiejetnosci: allSkills[0].ID_Umiejetnosci,
                        Maksymaln_Wartosc: 10,
                        Bazowa_Wartosc: 0
                    },
                    {
                        Klasy_ID_Klasy: allClasses[0].ID_Klasy,
                        Umiejetnosci_ID_Umiejetnosci: allSkills[0].ID_Umiejetnosci,
                        Maksymaln_Wartosc: 50,
                        Bazowa_Wartosc: 10
                    },
                ]);
            } else {
                return classSkills;
            }
        });
};
