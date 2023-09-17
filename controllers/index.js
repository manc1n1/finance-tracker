const router = require('express').Router();
const userRoutes = require('./api/userRoutes');

router.use('/user', userRoutes);
router.use('/portfolio', userRoutes);

module.exports = router;
