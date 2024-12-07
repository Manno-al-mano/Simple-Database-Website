const express = require('express');
const router = express.Router();

const classSkillApiController = require('../../api/ClassSkillAPI');

router.get('/',classSkillApiController.getClassSkills);
router.get('/:ID_Klasy_Umiejetnosci',classSkillApiController.getClassSkillsById);
router.post('/',classSkillApiController.createClassSkill);
router.put('/:ID_Klasy_Umiejetnosci',classSkillApiController.updateClassSkill);
router.delete('/:ID_Klasy_Umiejetnosci',classSkillApiController.deleteClassSkill);
module.exports = router;