const express = require('express');
const router = express.Router();
const { Pet } = require('../../models');
const withAuth = require('../../utils/auth');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const upload = multer({ dest: 'images/' });

// Define a route to handle file uploads and create new pets
router.post('/', withAuth, upload.single('picture'), async (req, res) => {
  try {
    // Read the uploaded file contents
    console.log(req.body); // log the request body
    console.log(req.file);
    const imageData = fs.readFileSync(req.file.path);

    // Create a new instance of your model, and set the BLOB property to the uploaded file contents
    const newPet = await Pet.create({
      ...req.body,
      user_id: req.session.user_id,
      picture: imageData
    });

    // Delete the uploaded file from disk
    fs.unlinkSync(req.file.path);

    res.status(200).json(newPet);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const petData = await Pet.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!petData) {
      res.status(404).json({ message: 'No pet found with this id!' });
      return;
    }

    // Delete the pet's image file from disk, if it exists
    const pet = await Pet.findByPk(req.params.id);
    if (pet.picture) {
      const imagePath = path.join(__dirname, '../../', pet.picture);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json(petData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;