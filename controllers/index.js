const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const dashRoutes = require('./dashRoutes')
const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/dashboard', dashRoutes);
router.use('/api', apiRoutes);

module.exports = router;