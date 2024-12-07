const ClassRepository = require('../repository/sequelize/ClassRepository');

exports.getClasses = (req,res,next) =>{
    ClassRepository.getClasses()
        .then(classes => {
            res.status(200).json(classes);
        })
        .catch(err=>{
            console.log(err);
        });
};
exports.getClassesById  = (req,res,next) =>{
    const classId = req.params.ID_Klasy;
    ClassRepository.getClassById(classId)
        .then(clas => {
            if(!clas){
                res.status(404).json({
                    message: 'Class with id: '+classId+' not found'
                })
            } else {
                res.status(200).json(clas);
            }
    });
};

exports.createClass = (req,res,next) =>{
    ClassRepository.createClass(req.body)
        .then(newObj => {
                res.status(201).json(newObj);
            })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateClass = (req,res,next) =>{
    console.log(JSON.stringify(req.body));
    console.log(req.params.ID_Klasy);
    const  classId = req.params.ID_Klasy;
    ClassRepository.updateClass(classId, req.body)
        .then(result => {
            res.status(200).json({message: 'Class updated!', clas:result});
        })
        .catch(err=>{
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};
exports.deleteClass = (req,res,next) =>{
    console.log(req.params.ID_Klasy);
    const  classId = req.params.ID_Klasy;
    ClassRepository.deleteClass(classId)
        .then(result=> {
            res.status(200).json({message: 'Class removed!', clas:result});
        })
        .catch(err=>{
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};
