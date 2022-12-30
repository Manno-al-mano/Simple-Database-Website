const express = require('express');
const router = express.Router();

const classApiController = require('../../api/ClassAPI');

router.get('/',classApiController.getClasses);
router.get('/:ID_Klasy',classApiController.getClassesById);
router.post('/',classApiController.createClass);
router.put('/:ID_Klasy',classApiController.updateClass);
router.delete('/:ID_Klasy',classApiController.deleteClass);
module.exports = router;