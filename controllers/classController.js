const ClassRepository = require('../repository/sequelize/ClassRepository');

exports.showClassList = (req,res,next) => {
    ClassRepository.getClasses()
        .then(clas=>{

            res.render('Pages/Klasy/list',
                {
                    clas:clas,
                    navLocation: 'class',
                pageTitle: req.__('class.list.pageTitle')
                });
        });
}

exports.showAddClassForm = (req,res,next) => {
    res.render('Pages/Klasy/form',
        {
            clas:{},
            pageTitle: req.__('class.form.add.pageTitle'),
            formMode: 'createNew',
            btnLabel: req.__('class.form.add.btnLabel'),
            formAction: '/classes/add',
            navLocation: 'class',
            validationErrors:[]});
}
exports.showEditClassForm = (req,res,next) => {
    const classId = req.params.ID_Klasy;
    console.log(classId);
    ClassRepository.getClassById(classId)
        .then(clas=>{

            res.render('Pages/Klasy/form',
                {
                    clas:clas,
                    formMode: 'edit',
                    pageTitle: req.__('class.form.edit.pageTitle'),
                    btnLabel: req.__('class.form.edit.btnLabel'),
                    formAction: '/classes/edit',
                    navLocation: 'class',
                    validationErrors:[]
                });
        });
};
exports.showClassDetails = (req,res,next) => {
    const classId = req.params.ID_Klasy;
    ClassRepository.getClassById(classId)
        .then(clas=>{

            res.render('Pages/Klasy/form',
                {
                    clas:clas,
                    formMode: 'showDetails',
                    pageTitle: req.__('class.form.detail.pageTitle'),
                    formAction: '',
                    navLocation: 'class',
                    validationErrors:[]
                });
        });
}
exports.addClass = (req,res,next) => {
    const classData = {...req.body};
    ClassRepository.createClass(classData)
        .then(result => {
            res.redirect('/classes');
        })
        .catch(err => {
            res.render('Pages/Klasy/form', {
                clas: classData,
                pageTitle: req.__('class.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('class.form.add.btnLabel'),
                formAction: '/classes/add',
                navLocation: 'class',
                validationErrors: err.errors
            });
        });
};
exports.updateClass = (req,res,next) => {
const classId = req.body.ID_Klasy;
    const classData = {...req.body};
    ClassRepository.updateClass(classId ,classData)
        .then(result =>{
            res.redirect('/classes');
        })
        .catch(err => {

            ClassRepository.getClassById(classId)
                .then(clas=>{
                    clas.Nazwa_Klasy= classData.Nazwa_Klasy;
                    clas.Maksymalny_Poziom=classData.Maksymalny_Poziom;
                    clas.Data_Utworzenia=classData.Data_Utworzenia;
                    res.render('Pages/Klasy/form',
                        {
                            clas:clas,
                            formMode: 'edit',
                            pageTitle: req.__('class.form.edit.pageTitle'),
                            btnLabel: req.__('class.form.edit.btnLabel'),
                            formAction: '/classes/edit',
                            navLocation: 'class',
                            validationErrors:err.errors
                        });
                });
        });
};
exports.deleteClass = (req,res,next) => {
    const classId = req.params.ID_Klasy;
    ClassRepository.deleteClass(classId)
        .then(()=>{
            res.redirect('/classes');
        });

};