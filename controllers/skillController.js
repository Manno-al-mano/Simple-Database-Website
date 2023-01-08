const SkillRepository = require('../repository/sequelize/SkillRepository');

exports.showSkillList = (req,res,next) => {
    SkillRepository.getSkills()
        .then(skill=>{

            res.render('Pages/Umiejętności/list',
                {
                    skill:skill,
                    navLocation: 'skill'});
        });
}

exports.showAddSkillForm = (req,res,next) => {
    res.render('Pages/Umiejętności/form',
        {
            skill: {},
            pageTitle: 'Nowa Umiejętność',
            formMode: 'createNew',
            btnLabel: "Dodaj Umiejętność",
            formAction: '/skills/add',
            navLocation: 'skill',
            validationErrors: []
        });
}
exports.showEditSkillForm = (req,res,next) => {
    const skillId = req.params.ID_Umiejetnosci;
    //console.log(skillId);
    SkillRepository.getSkillById(skillId)
        .then(skill=>{

            res.render('Pages/Umiejętności/form',
                {
                    skill:skill,
                    formMode: 'edit',
                    pageTitle: 'Edycja Umiejętności',
                    btnLabel: "Edytuj Umiejętność",
                    formAction: '/skills/edit',
                    navLocation: 'skill',
                    validationErrors:[]
                });
        });
};
exports.showSkillDetails = (req,res,next) => {
    const skillId = req.params.ID_Umiejetnosci;
    SkillRepository.getSkillById(skillId)
        .then(skill=>{

            res.render('Pages/Umiejętności/form',
                {
                    skill:skill,
                    formMode: 'showDetails',
                    pageTitle: 'Szczegóły Umiejętności',
                    formAction: '',
                    navLocation: 'skill',
                    validationErrors:[]
                });
        });
}
exports.addSkill = (req,res,next) => {
    const skillData = {...req.body};
    if(skillData.MinimalnyPoziomPostaci=="")
        skillData.MinimalnyPoziomPostaci=null;
    SkillRepository.createSkill(skillData)
        .then(result =>{
            res.redirect('/skills');
        })
        .catch(err => {
            res.render('pages/Umiejętności/form', {
                skill: skillData,
                pageTitle: 'Nowa Umiejętność',
                formMode: 'createNew',
                btnLabel: "Dodaj Umiejętność",
                formAction: '/skills/add',
                navLocation: 'skill',
                validationErrors: err.errors
            });
        });
};
exports.updateSkill = (req,res,next) => {
    const skillId = req.body.ID_Umiejetnosci;
    const skillData = {...req.body};
    if(skillData.MinimalnyPoziomPostaci=="")
        skillData.MinimalnyPoziomPostaci=null;
    SkillRepository.updateSkill(skillId ,skillData)
        .then(result =>{
            res.redirect('/skills');
        })
        .catch(err => {
            SkillRepository.getSkillById(skillId)
                .then(skill=>{
skill.Nazwa=skillData.Nazwa;
skill.MinimalnyPoziomPostaci=skillData.MinimalnyPoziomPostaci;
skill.Opis=skillData.Opis;
            res.render('pages/Umiejętności/form', {
                skill: skill,
                formMode: 'edit',
                pageTitle: 'Edycja Umiejętności',
                btnLabel: "Edytuj Umiejętność",
                formAction: '/skills/edit',
                navLocation: 'skill',
                validationErrors: err.errors
            });
        });
        });
};
exports.deleteSkill = (req,res,next) => {
    const skillId = req.params.ID_Umiejetnosci;
    SkillRepository.deleteSkill(skillId)
        .then(()=>{
            res.redirect('/skills');
        });

};