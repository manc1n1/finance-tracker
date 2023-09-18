const router = require('express').Router();
const userRoutes = require('./api/userRoutes');
const portfolioRoutes = require("./api/portfolioRoutes")
const salaryRoutes = require("./api/salaryRoutes")
const investmentRoutes = require("./api/investmentRoutes")

router.use('/user', userRoutes);
router.use('/portfolio', portfolioRoutes);
router.use("/salary", salaryRoutes)
router.use("/investment", investmentRoutes)

module.exports = router;
