const router = require('express').Router();
const userRoutes = require('./userRoutes');
const appointmentRoutes = require('./appointmentRoutes');
const newPetRoutes = require('./petRoutes');

router.use('/users', userRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/newpet', newPetRoutes);

module.exports = router;
