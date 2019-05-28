const { Router } = require('express');
const router = Router();

//Call to controllers by url
router.use('/auth', require('./controllers/auth.controller'));
router.use('/ear', require('./controllers/ear.controller'));

module.exports = router;
