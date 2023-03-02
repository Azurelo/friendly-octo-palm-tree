const router = require('express').Router();
const userRoutes = require('./userRoutes');
const petRoutes = require('./petRoutes');
const newPetRoutes = require('./petRoutes');

router.use('/users', userRoutes);
router.use('/pets', petRoutes);
router.use('/newpet', newPetRoutes);

module.exports = router;
