const ClassSkillRepository = require('../repository/sequelize/ClassSkillRepository');
const ClassRepository = require('../repository/sequelize/ClassRepository');
const SkillRepository = require('../repository/sequelize/SkillRepository');

exports.showClassSkillList = (req,res,next) => {
    ClassSkillRepository.getClassSkills()
        .then(classSkills=>{

            res.render('Pages/KlasyUmiejętności/list',
                {
                    classSkills:classSkills,
                    navLocation: 'classSkill'});
        });
}

exports.showAddClassSkillForm = (req,res,next) => {
    let allClasses, allSkills;
    ClassRepository.getClasses()
        .then(clas =>{
            allClasses=clas;
            return SkillRepository.getSkills();
        })
        .then(skill=>{
            allSkills=skill;
            res.render('Pages/KlasyUmiejętności/form', {
                classSkills:{},
                formMode: 'createNew',
                allClasses: allClasses,
                allSkills: allSkills,
                pageTitle: 'Nowa Umiejętność Klasy',
                btnLabel: 'Dodaj Umiejętność Klasy',
                formAction: '/classSkills/add',
                navLocation: 'classSkill'
                });
        });
}

exports.showEditClassSkillForm = (req,res,next) => {
    let allClasses, allSkills;
    const classSkillId = req.params.ID_Klasy_Umiejetnosci;
    ClassRepository.getClasses()
        .then(clas =>{
            allClasses=clas;
            return SkillRepository.getSkills();
        })
        .then(skill=>{
            allSkills=skill;
            return ClassSkillRepository.getClassSkillsById(classSkillId);
        })
        .then(classSkills => {
            console.log(classSkills.ID_Klasy_Umiejetnosci)
            res.render('Pages/KlasyUmiejętności/form',
                {
                    classSkills:classSkills,
                    formMode: 'edit',
                    allClasses: allClasses,
                    allSkills: allSkills,
                    pageTitle: 'Edycja Umiejętności klasy',
                    btnLabel: "Edytuj umiejętność klasy",
                    formAction: '/classSkills/edit',
                    navLocation: 'classSkill'
                });
        });
};
exports.showClassSkillDetails = (req,res,next) => {

    const classSkillId = req.params.ID_Klasy_Umiejetnosci;
    let allClasses, allSkills;
    ClassRepository.getClasses()
        .then(clas =>{
            allClasses=clas;
            return SkillRepository.getSkills();
        })
        .then(skill=>{
            allSkills=skill;
            return ClassSkillRepository.getClassSkillsById(classSkillId);
        })
        .then(classSkills => {
            console.log(classSkills.ID_Klasy_Umiejetnosci)
            res.render('Pages/KlasyUmiejętności/form',
                {
                    classSkills: classSkills,
                    formMode: 'showDetails',
                    allClasses: allClasses,
                    allSkills: allSkills,
                    pageTitle: 'Szczegóły umiejętności klasy',
                    formAction: '',
                    navLocation: 'classSkill'
                });
        });
}

/*exports.showEditClassSkillForm = (req,res,next) => {
    const classSkillId = req.params.ID_Klasy;
    ClassSkillRepository.getClassSkillsById(classSkillId)
        .then(classSkills=>{

            res.render('Pages/KlasyUmiejętności/form',
                {
                    classSkills:classSkills,
                    formMode: 'edit',
                    pageTitle: 'Edycja Umiejętności klasy',
                    btnLabel: "Edytuj umiejętność klasy",
                    formAction: '/classSkillssSkilles/edit',
                    navLocation: 'classSkill'
                });
        });
};
exports.showClassSkillDetails = (req,res,next) => {
    const classSkillId = req.params.ID_Klasy_Umiejetnosci;
    ClassSkillRepository.getClassSkillsById(classSkillId )
        .then(classSkills=>{

            res.render('Pages/KlasyUmiejętności/form',
                {
                    classSkills:classSkills,
                    formMode: 'showDetails',
                    pageTitle: 'Szczegóły umiejętności klasy',
                    formAction: '',
                    navLocation: 'classSkill'
                });
        });
}*/
exports.addClassSkill = (req,res,next) => {
    const classSkillslData = {...req.body};
ClassSkillRepository.createClassSkill(classSkillslData)
        .then(result =>{
            res.redirect('/classSkills');
        });
}
exports.updateClassSkill = (req,res,next) => {
    const classSkillId = req.body.ID_Klasy_Umiejetnosci;
    const classSkillData = {...req.body};
    ClassSkillRepository.updateClassSkill(classSkillId, classSkillData)
        .then(result => {
            res.redirect('/classSkills');
        });
}
exports.deleteClassSkill = (req,res,next) => {
    const classSkillId = req.params.ID_Klasy_Umiejetnosci;
    ClassSkillRepository.deleteClassSkill(classSkillId)
        .then(() => {
            res.redirect('/classSkills');
        });
};