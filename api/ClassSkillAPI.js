const ClassSkillRepository = require('../repository/sequelize/ClassSkillRepository');

exports.getClassSkills = (req,res,next) =>{
    ClassSkillRepository.getClassSkills()
        .then(classSkill => {
            res.status(200).json(classSkill);
        })
        .catch(err=>{
            console.log(err);
        });
};
exports.getClassSkillsById  = (req,res,next) =>{
    const classSkillId = req.params.ID_Klasy_Umiejetnosci;
    console.log(classSkillId);
    ClassSkillRepository.getClassSkillsById(classSkillId)
        .then(classSkills => {
            if(!classSkills){
                res.status(404).json({
                    message: 'ClassSkill with id: '+classSkillId+' not found'
                })
            } else {
                res.status(200).json(classSkills);
            }
        });
};

exports.createClassSkill = (req,res,next) =>{
    ClassSkillRepository.createClassSkill(req.body)
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

exports.updateClassSkill = (req,res,next) =>{
    const  classSkillId = req.params.ID_Klasy_Umiejetnosci;
    ClassSkillRepository.updateClassSkill(classSkillId, req.body)
        .then(result => {
            res.status(200).json({message: 'ClassSkill updated!', classSkills:result});
        })
        .catch(err=>{
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};
exports.deleteClassSkill = (req,res,next) =>{
    console.log(req.params.ID_Klasy_Umiejetnosci);
    const  classSkillId = req.params.ID_Klasy_Umiejetnosci;
    ClassSkillRepository.deleteClassSkill(classSkillId)
        .then(result=> {
            res.status(200).json({message: 'ClassSkill removed!', classSkills:result});
        })
        .catch(err=>{
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};
