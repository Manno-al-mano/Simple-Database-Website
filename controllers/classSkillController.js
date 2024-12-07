const ClassSkillRepository = require('../repository/sequelize/ClassSkillRepository');
const ClassRepository = require('../repository/sequelize/ClassRepository');
const SkillRepository = require('../repository/sequelize/SkillRepository');

exports.showClassSkillList = (req,res,next) => {
    ClassSkillRepository.getClassSkills()
        .then(classSkills=>{

            res.render('Pages/KlasyUmiejętności/list',
                {
                    classSkills:classSkills,
                    navLocation: 'classSkill',
                    pageTitle: req.__('classSkill.list.pageTitle')
                });
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
                pageTitle: req.__('classSkill.form.add.pageTitle'),
                btnLabel: req.__('classSkill.form.add.btnLabel'),
                formAction: '/classSkills/add',
                navLocation: 'classSkill',
                validationErrors:[]
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
            res.render('Pages/KlasyUmiejętności/form',
                {
                    classSkills:classSkills,
                    formMode: 'edit',
                    allClasses: allClasses,
                    allSkills: allSkills,
                    pageTitle: req.__('classSkill.form.edit.pageTitle'),
                    btnLabel: req.__('classSkill.form.edit.btnLabel'),
                    formAction: '/classSkills/edit',
                    navLocation: 'classSkill',
                    validationErrors:[]
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
           // console.log(classSkills.ID_Klasy_Umiejetnosci)
            res.render('Pages/KlasyUmiejętności/form',
                {
                    classSkills: classSkills,
                    formMode: 'showDetails',
                    allClasses: allClasses,
                    allSkills: allSkills,
                    pageTitle: req.__('classSkill.form.detail.pageTitle'),
                    formAction: '',
                    navLocation: 'classSkill',
                    validationErrors:[]
                });
        });
}



exports.addClassSkill = (req,res,next) => {
    const classSkillData = {...req.body};
    let allClasses,allSkills;
ClassSkillRepository.createClassSkill(classSkillData)
        .then(result =>{
            res.redirect('/classSkills');
        })
    .catch(err => {
        ClassRepository.getClasses()
            .then(clas =>{
                allClasses=clas;
                return SkillRepository.getSkills();
            })
            .then(skill=> {
                allSkills = skill;
                res.render('Pages/KlasyUmiejętności/form',
                    {
                        classSkills: classSkillData,
                        formMode: 'createNewError',
                        allClasses: allClasses,
                        allSkills: allSkills,
                        pageTitle: req.__('classSkill.form.add.pageTitle'),
                        btnLabel: req.__('classSkill.form.add.btnLabel'),
                        formAction: '/classSkills/add',
                        navLocation: 'classSkill',
                        validationErrors:err.errors
                    });
            });

    })

}
exports.updateClassSkill = (req,res,next) => {
    const classSkillId = req.body.ID_Klasy_Umiejetnosci;
    let allClasses,allSkills;
    const classSkillData = {...req.body};
    ClassSkillRepository.updateClassSkill(classSkillId, classSkillData)
        .then(result =>{
            res.redirect('/classSkills');
        })
        .catch(err => {
            ClassRepository.getClasses()
                .then(clas =>{
                    allClasses=clas;
                    return SkillRepository.getSkills();
                })
                .then(skill=> {
                    allSkills = skill;
                    res.render('Pages/KlasyUmiejętności/form',
                        {
                            classSkills: classSkillData,
                            formMode: 'edit',
                            allClasses: allClasses,
                            allSkills: allSkills,
                            pageTitle: req.__('classSkill.form.edit.pageTitle'),
                            btnLabel: req.__('classSkill.form.edit.btnLabel'),
                            formAction: '/classSkills/edit',
                            navLocation: 'classSkill',
                            validationErrors:err.errors
                        });
                });

                })

        }
        /*exports.updateClassSkill = (req,res,next) => {
    const classSkillId = req.body.ID_Klasy_Umiejetnosci;
    let allClasses,allSkills;
    const classSkillData = {...req.body};
    ClassSkillRepository.updateClassSkill(classSkillId, classSkillData)
        .then(result =>{
            res.redirect('/classSkills');
        })
        .catch(err => {
            ClassRepository.getClasses()
                .then(clas =>{
                    allClasses=clas;
                    return SkillRepository.getSkills();
                })
                .then(skill=> {
                    allSkills = skill;
                    return ClassSkillRepository.getClassSkillsById(classSkillId);
                })
                .then(classSkills => {
                    res.render('Pages/KlasyUmiejętności/form',
                        {
                            classSkills: classSkillData,
                            formMode: 'edit',
                            allClasses: allClasses,
                            allSkills: allSkills,
                            pageTitle: 'Edycja Umiejętności klasy',
                            btnLabel: "Edytuj umiejętność klasy",
                            formAction: '/classSkills/edit',
                            navLocation: 'classSkill',
                            validationErrors:err.errors
                        });
                });

                })

        }*/
exports.deleteClassSkill = (req,res,next) => {
    const classSkillId = req.params.ID_Klasy_Umiejetnosci;
    ClassSkillRepository.deleteClassSkill(classSkillId)
        .then(() => {
            res.redirect('/classSkills');
        });
};