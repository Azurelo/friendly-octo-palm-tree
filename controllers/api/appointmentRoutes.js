const express = require('express');
const router = express.Router();
const { Appointment } = require('../../models');
const withAuth = require('../../utils/auth');

/* ------------------------------------------------------ */

// Define a route to handle file uploads and create new appointments
router.post('/', withAuth, async (req, res) => {
  try {
    // Create a new instance of your model
    console.log(req);
    const newAppointment = await Appointment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newAppointment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const appointmentData = await Appointment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!appointmentData) {
      res.status(404).json({ message: 'No appointment found with this id!' });
      return;
    }
    res.status(200).json(appointmentData);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;