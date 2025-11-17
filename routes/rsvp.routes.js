const express = require('express');
const router = express.Router();
const RSVP = require('../models/RSVP');

// Submit RSVP
router.post('/submit', async (req, res) => {
  try {
    const { firstName, lastName, email, numberOfGuests, rsvpStatus } = req.body;

    // Validation
    if (!firstName || !lastName || !email || numberOfGuests === undefined || !rsvpStatus) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (numberOfGuests < 0 || numberOfGuests > 5) {
      return res.status(400).json({ message: 'Number of guests must be between 0 and 5' });
    }

    if (!['Yes', 'No'].includes(rsvpStatus)) {
      return res.status(400).json({ message: 'RSVP status must be Yes or No' });
    }

    // Check if email already exists
    const existingRSVP = await RSVP.findOne({ where: { email } });
    if (existingRSVP) {
      return res.status(400).json({ message: 'This email has already submitted an RSVP' });
    }

    // Create RSVP
    const newRSVP = await RSVP.create({
      firstName,
      lastName,
      email,
      numberOfGuests,
      rsvpStatus
    });

    res.status(201).json({ 
      message: 'RSVP submitted successfully', 
      rsvp: newRSVP 
    });
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    res.status(500).json({ message: 'Error submitting RSVP', error: error.message });
  }
});

// Lookup RSVP by email
router.post('/lookup', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const rsvp = await RSVP.findOne({ where: { email } });

    if (!rsvp) {
      return res.status(404).json({ message: 'Email address not registered for this event' });
    }

    res.status(200).json({
      firstName: rsvp.firstName,
      lastName: rsvp.lastName,
      email: rsvp.email,
      numberOfGuests: rsvp.numberOfGuests,
      rsvpStatus: rsvp.rsvpStatus
    });
  } catch (error) {
    console.error('Error looking up RSVP:', error);
    res.status(500).json({ message: 'Error looking up RSVP', error: error.message });
  }
});

module.exports = router;