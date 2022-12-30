const SkillRepository = require('../repository/sequelize/SkillRepository');

exports.getSkills = (req,res,next) =>{
    SkillRepository.getSkills()
        .then(skills => {
            res.status(200).json(skills);
        })
        .catch(err=>{
            console.log(err);
        });
};
exports.getSkillsById  = (req,res,next) =>{
    const skillId = req.params.ID_Umiejetnosci;
    SkillRepository.getSkillById(skillId)
        .then(skill => {
            if(!skill){
                res.status(404).json({
                    message: 'Skill with id: '+skillId+' not found'
                })
            } else {
                res.status(200).json(skill);
            }
        });
};

exports.createSkill = (req,res,next) =>{
    SkillRepository.createSkill(req.body)
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

exports.updateSkill = (req,res,next) =>{
    const  skillId = req.params.ID_Umiejetnosci;
    SkillRepository.updateSkill(skillId,req.body)
        .then(result => {
            res.status(200).json({message: 'Skill updated!', skill:result});
        })
        .catch(err=>{
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};
exports.deleteSkill = (req,res,next) =>{
    const  skillId = req.params.ID_Umiejetnosci;
    SkillRepository.deleteSkill(skillId)
        .then(result=> {
            res.status(200).json({message: 'Skill removed!', skill:result});
        })
        .catch(err=>{
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};
