// routes/availabilityTimingRoutes.js
const express = require('express');
const router = express.Router();
const AvailabilityTiming = require('../models/AvailabilityTiming');

// Get all availability timings
router.get('/', async (req, res) => {
  try {
    const timings = await AvailabilityTiming.find();
    const formattedTimings = timings.map(timing => ({
      ...timing._doc,
      date: new Date(timing.date).toISOString().split('T')[0] // Return date in 'YYYY-MM-DD' format
    }));
    res.json(formattedTimings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Save availability timing
router.post('/', async (req, res) => {
  try {
    const { date, time, fee, name, email } = req.body;
    const newTiming = new AvailabilityTiming({ date, time, fee, booked: 'n', name, email }); // Include 'booked' with default value 'n'
    await newTiming.save();
    res.status(201).json({ message: 'Availability timing saved successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update availability timing by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { date, time, fee } = req.body;

  try {
    // Find the timing by ID and update it
    const updatedTiming = await AvailabilityTiming.findByIdAndUpdate(id, { date, time, fee }, { new: true });
    if (!updatedTiming) {
      return res.status(404).json({ message: 'Availability timing not found' });
    }

    res.status(200).json(updatedTiming); // Return the updated timing
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete availability timing by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find the timing by ID and delete it
    const deletedTiming = await AvailabilityTiming.findByIdAndDelete(id);
    if (!deletedTiming) {
      return res.status(404).json({ message: 'Availability timing not found' });
    }

    res.status(200).json({ message: 'Availability timing deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;