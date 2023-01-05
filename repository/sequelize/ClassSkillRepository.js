const Sequelize = require('sequelize');

const Class= require('../../model/sequelize/Class');
const ClassSkill= require('../../model/sequelize/ClassSkill');
const Skill= require('../../model/sequelize/Skill');

exports.getClassSkills = () => {
    return ClassSkill.findAll({
        include: [
            {
                model: Class,
                as: 'clas'
            },
            {
                model: Skill,
                as: 'skill'
            }]
    });
};
exports.getClassSkillsById = (classSkillId)=> {
    return ClassSkill.findByPk(classSkillId,
        {
            include: [
                {
                    model: Class,
                    as: 'clas'
                },
                {
                    model: Skill,
                    as: 'skill'

            }]
        });
};

exports.createClassSkill = (data) => {
    console.log(JSON.stringify(data));

    return ClassSkill.create({
        //ID_Klasy_Umiejetnosci: data.ID_Klasy_Umiejetnosci,
        Klasy_ID_Klasy: data.Klasy_ID_Klasy,
        Umiejetnosci_ID_Umiejetnosci: data.Umiejetnosci_ID_Umiejetnosci,
        Maksymaln_Wartosc: data.Maksymaln_Wartosc,
        Bazowa_Wartosc: data.Bazowa_Wartosc

    });
};
exports.updateClassSkill = (classSkillId, data) => {
    console.log(classSkillId);
    console.log(JSON.stringify(data));
    return ClassSkill.update(data, {where: {ID_Klasy_Umiejetnosci: classSkillId}});
}
exports.deleteClassSkill = (id) => {
    console.log(id);
    return ClassSkill.destroy({
        where: {ID_Klasy_Umiejetnosci: id}
    });
}

exports.deleteManyClassSkills = (classSkillIds) => {
    return ClassSkill.find({ID_Klasy_Umiejetnosci: {[Sequelize.Op.in]:classSkillIds }})
}

