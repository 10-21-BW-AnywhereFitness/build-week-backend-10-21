const express = require('express');
const router = express.Router();

//[POST] /classes/ (auth instructor)
router.post('/classes')

//[PUT] /classes/:class_id(auth_instructor)
router.put('/classes/:class_id', (req, res, next) => {})

//[DELETE] /classes/:class_id (auth instructor)
router.delete('/classes/:class_id', (req, res, next) => {})

module.exports = router;
