const Class= require('../../model/sequelize/Class');
const ClassSkill= require('../../model/sequelize/ClassSkill');
const Skill= require('../../model/sequelize/Skill');

exports.getSkills = () => {
    return Skill.findAll();
}
exports.getSkillById = (skillId)=> {
    return Skill.findByPk(skillId,
        {
            include: [{
                model: ClassSkill,
                as: 'classSkills',
                include: [{
                    model: Class,
                    as: 'clas'
                }]
            }]
        });
};
exports.createSkill = (newSkillData) => {
    console.log(JSON.stringify(newSkillData));
    return Skill.create({
        Nazwa: newSkillData.Nazwa,
        MinimalnyPoziomPostaci: newSkillData.MinimalnyPoziomPostaci,
        Opis: newSkillData.Opis
    });
};
exports.updateSkill = (skillId,skillData) => {



    const Nazwa = skillData.Nazwa;
    const MinimalnyPoziomPostaci = skillData.MinimalnyPoziomPostaci;
    const Opis = skillData.Opis;

    return Skill.update(skillData,{where: {ID_Umiejetnosci: skillId}});
}
exports.deleteSkill = (skillId) => {
    return Skill.destroy({
        where: {ID_Umiejetnosci: skillId}
    });
}

