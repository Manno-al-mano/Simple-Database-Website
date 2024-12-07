const express = require('express');
const router = express.Router();

const skillApiController = require('../../api/SkillAPI');

router.get('/',skillApiController.getSkills);
router.get('/:ID_Umiejetnosci',skillApiController.getSkillsById);
router.post('/',skillApiController.createSkill);
router.put('/:ID_Umiejetnosci',skillApiController.updateSkill);
router.delete('/:ID_Umiejetnosci',skillApiController.deleteSkill);
module.exports = router;