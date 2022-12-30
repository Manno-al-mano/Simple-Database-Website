const Class= require('../../model/sequelize/Class');
const ClassSkill= require('../../model/sequelize/ClassSkill');
const Skill= require('../../model/sequelize/Skill');

exports.getClasses = () => {
    return Class.findAll();
}
exports.getClassById = (classId) => {
    return Class.findByPk(classId,
        {
            include: [{
                model: ClassSkill,
                as: 'classSkills',
                include: [{
                    model: Skill,
                    as: 'skill'
                }]
            }]
        });
};
exports.createClass = (newClassData) => {
    console.log(JSON.stringify(newClassData));
    return Class.create(
        {
        Nazwa_Klasy:  newClassData.Nazwa_Klasy,
        Maksymalny_Poziom: newClassData.Maksymalny_Poziom,
        Data_Utworzenia: newClassData.Data_Utworzenia
}
        //{Nazwa_Klasy: 'Arcywojownik', Maksymalny_Poziom: 50, Data_Utworzenia: '2001-01-01'}
    );
};
exports.updateClass = (classId, classData) => {
    console.log(classId);
    console.log(JSON.stringify(classData));
    const Nazwa_Klasy =         classData.Nazwa_Klasy;
    const Maksymalny_Poziom =   classData.Maksymalny_Poziom;
    const Data_Utworzenia =     classData.Data_Utworzenia;
    return Class.update(classData, {where: {ID_Klasy: classId}});
}
exports.deleteClass = (classId) => {
    return Class.destroy({
        where: {ID_Klasy: classId}
    });
}
