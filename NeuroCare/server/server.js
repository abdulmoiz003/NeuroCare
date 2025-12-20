const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PatientModel = require('./models/Patient');
const NeurologistModel = require('./models/Neurologist');
const AdminModel = require('./models/Admin');
const AvailabilityTiming = require('./models/AvailabilityTiming');
const Appointment = require('./models/Appointment');
const ParkReport = require('./models/ParkReport'); 
const AlzReport = require('./models/AlzReport'); 
const StrokeReport = require('./models/StrokeReport');
const DietPlan = require('./models/DietPlan');
const EPrescription = require('./models/EPrescription');
const SharedReport = require('./models/SharedReport');
const NeurologistRating = require('./models/NeurologistRating');
const Rating = require('./models/Rating');
const Message = require('./models/Message');
const Conversation = require('./models/Conversation');

const stripe = require('stripe')('sk_test_51PsioQRt6rKMjsYLK3O6Fo4ubbXbR0Cp06bBL6EbUaqee7ZfZmfU909W5bUfjpOqLWyK7aoV5XtkUNgYncIz7Wwp005uBLHfHp')

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Add this line to enable CORS
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/NeuroCare')
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);  // Exit if cannot connect to database
  });

// Routes

// patient sign up
app.post('/register', async (req, res) => {
  const { email } = req.body;
  try {
      const user = await PatientModel.findOne({ email });
      if (user) {
          return res.status(400).json({ message: 'Email already in use' });
      }
      else {
          PatientModel.create(req.body)
              .then(patient => res.json(patient))
              .catch(err => res.json(err));
      }
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }

});


// patient login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await PatientModel.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: "No record exists" });
    }
    
    if (user.password !== password) {
      return res.status(401).json({ message: "Password is incorrect" });
    }

    res.status(200).json({ 
      message: "Success",
      userId: user._id,
      email: user.email
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Server error" });
  }
});

// find patient profile by email
app.get('/patient/:email', (req, res) => {
  const { email } = req.params;
  PatientModel.findOne({ email })
      .then(patient => {
          if (!patient) {
              return res.status(404).json({ message: "Patient not found" });
          }
          res.json(patient);
      })
      .catch(err => res.status(500).json({ message: 'Server error', err }));
});

// find patient profile with email and update
app.put('/patient/:email', (req, res) => {
  const { email } = req.params;
  // console.log(email);
  PatientModel.findOneAndUpdate({ email }, req.body, { new: true })
      .then(updatedPatient => {
          if (!updatedPatient) {
              return res.status(404).json({ message: "Patient not found" });
          }
          res.json(updatedPatient);
      })
      .catch(err => res.status(500).json({ message: 'Server error', err }));
});

// delete patient account
app.delete('/patients/:id', (req, res) => {
  const { id } = req.params;
  PatientModel.findByIdAndDelete(id)
      .then(() => res.json({ message: 'Patient deleted' }))
      .catch((err) => res.status(500).json(err));
});

// Verify current password
app.post('/PatientVerifyPassword', (req, res) => {
  const { email, currentPassword } = req.body;
  PatientModel.findOne({ email })
      .then(patient => {
          if (!patient) {
              return res.status(404).json({ message: "Patient not found" });
          }
          if (patient.password === currentPassword) {
              res.json({ message: "Password verified" });
          } else {
              res.status(401).json({ message: "Incorrect current password" });
          }
      })
      .catch(err => res.status(500).json({ message: 'Server error', err }));
});

// Reset password
app.post('/PatientResetPassword', (req, res) => {
  const { email, newPassword } = req.body;
  PatientModel.findOneAndUpdate({ email }, { password: newPassword }, { new: true })
      .then(updatedPatient => {
          if (!updatedPatient) {
              return res.status(404).json({ message: "Patient not found" });
          }
          res.json({ message: "Password reset successful" });
      })
      .catch(err => res.status(500).json({ message: 'Server error', err }));
});


// neurologist signup
app.post('/NeurologistRegister', async (req, res) => {
  const { email } = req.body;
  try {
      const user = await NeurologistModel.findOne({ email });
      if (user) {
          return res.status(400).json({ message: 'Email already in use' });
      }
      else {
          NeurologistModel.create(req.body)
              .then(neurologist => res.json(neurologist))
              .catch(err => res.json(err));
   
      }
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }

});

// neurologist login
app.post('/NeurologistLogin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await NeurologistModel.findOne({ email: email });
    
    if (!user) {
      return res.status(404).json({ message: "No record exists" });
    }
    
    if (user.approved !== "y") {
      return res.status(403).json({ message: "Neurologist not approved (Try again later)" });
    }
    
    if (user.password !== password) {
      return res.status(401).json({ message: "Password is incorrect" });
    }

    res.status(200).json({ 
      message: "Success",
      userId: user._id,
      email: user.email
    });
  } catch (error) {
    console.error('Neurologist login error:', error);
    res.status(500).json({ message: "Server error" });
  }
})

// neurologist get using email 1
app.get('/neurologist/:email', (req, res) => {
  const { email } = req.params;
  NeurologistModel.findOne({ email })
      .then(neurologist => {
          if (!neurologist) {
              return res.status(404).json({ message: "Neurologist not found" });
          }
          res.json(neurologist);
      })
      .catch(err => res.status(500).json({ message: 'Server error', err }));
});

// neurologist get using email 2
// app.get('/neurologist/:email', (req, res) => {
//   const { email } = req.params;
//   NeurologistModel.findOne({ email })
//       .then(neurologist => {
//           if (!neurologist) {
//               return res.status(404).json({ message: "neurologistnot found" });
//           }
//           res.json(neurologist);
//       })
//       .catch(err => res.status(500).json({ message: 'Server error', err }));
// });

// neurologist profile update by email
// find profile of neurologist and update
app.put('/neurologist/:email', (req, res) => {
  const { email } = req.params;
  NeurologistModel.findOneAndUpdate({ email }, req.body, { new: true })
      .then(updatedNeurologist => {
          if (!updatedNeurologist) {
              return res.status(404).json({ message: "neurologist not found" });
          }
          res.json(updatedNeurologist);
      })
      .catch(err => res.status(500).json({ message: 'Server error', err }));
});

// delete neurologist account
app.delete('/neurologist/:id', (req, res) => {
  const { id } = req.params;
  NeurologistModel.findByIdAndDelete(id)
      .then(() => res.json({ message: 'neurologistdeleted' }))
      .catch((err) => res.status(500).json(err));
});

// verify neurologist current password
app.post('/NeurologistVerifyPassword', (req, res) => {
  const { email, currentPassword } = req.body;
  NeurologistModel.findOne({ email })
      .then(neurologist => {
          if (!neurologist) {
              return res.status(404).json({ message: "Neurologist not found" });
          }
          if (neurologist.password === currentPassword) {
              res.json({ message: "Password verified" });
          } else {
              res.status(401).json({ message: "Incorrect current password" });
          }
      })
      .catch(err => res.status(500).json({ message: 'Server error', err }));
});

//reset neurologist password
app.post('/NeurologistResetPassword', (req, res) => {
  const { email, newPassword } = req.body;
  NeurologistModel.findOneAndUpdate({ email }, { password: newPassword }, { new: true })
      .then(updatedNeurologist => {
          if (!updatedNeurologist) {
              return res.status(404).json({ message: "Neurologist not found" });
          }
          res.json({ message: "Password reset successful" });
      })
      .catch(err => res.status(500).json({ message: 'Server error', err }));
});







// Route to get patient information by email
app.get('/patient/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const patient = await PatientModel.findOne({ email });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    console.error('Error fetching patient information:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

//admin login
app.post('/AdminLogin', (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  AdminModel.findOne({ email: email }).then(user => {
      if (user) {
          if (user.password === password) {
              res.json("Success")
          } else {
              res.json("Password is incorrect")
          }
      } else {
        console.log("x");
          res.json("No record Exist")
      }
  })

})


// availability timings based on date
app.get('/availability/:date', (req, res) => {
  const { date } = req.params;
  AvailabilityTiming.find({ date: date, booked: 'n' }).then(slots => {
    if (slots.length > 0) {
      res.status(200).json(slots);
    } else {
      res.status(404).json({ message: 'No available slots found for this date' });
    }
  }).catch(error => {
    console.error('Error fetching available slots:', error);
    res.status(500).json({ error: error.message });
  });
});

// availability timings based on neurologist
app.get('/neurologistavailability/:email', (req, res) => {
  const { email } = req.params;
  AvailabilityTiming.find({ email: email }).then(slots => {
    if (slots.length > 0) {
      res.status(200).json(slots);
    } else {
      res.status(404).json({ message: 'No available timings added' });
    }
  }).catch(error => {
    console.error('Error fetching available slots:', error);
    res.status(500).json({ error: error.message });
  });
});

// save booked appointments
app.post('/book-appointment', async (req, res) => {
  const { patientName, patientEmail, neurologistName, neurologistEmail, date, time, fee, timingId } = req.body;

  try {
    // Save appointment details
    const appointment = new Appointment({
      patientName,
      patientEmail,
      neurologistName,
      neurologistEmail,
      date,
      time
    });
    await appointment.save();

    // Update availability timing to booked
    await AvailabilityTiming.findByIdAndUpdate(timingId, { booked: 'y' });

    res.status(200).json({ message: 'Appointment booked successfully!' });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update Appointment Route
app.put('/updateappointment/:id', async (req, res) => {
  try {
    // Get appointment ID from params
    const appointmentId = req.params.id;
    
    // Get the updated appointment data from the request body
    const { date, time } = req.body;
    
    // Find the appointment by ID and update it
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { date, time }, // Fields to update
      { new: true } // Return the updated appointment
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Respond with the updated appointment
    res.json(updatedAppointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating appointment' });
  }
});

// get appointments for neurologist
app.get('/neurologistappointments/:email', async (req, res) => {
  try {
    const {email} = req.params;
    // alert(email);
    const appointments = await Appointment.find({ neurologistEmail: email });
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: error.message });
  }
});

// get appointments for patient
app.get('/patientappointments/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const appointments = await Appointment.find({ patientEmail: email });
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route to save Parkinson's Detection Report
app.post('/saveReport', async (req, res) => {
  const { patientName, patientAge, patientGender, disease, detectionResult, email } = req.body;

  try {
    // Validate required fields
    if (!patientName || !patientAge || !patientGender || !disease || !detectionResult || !email) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create a new ParkReport document
    const newReport = new ParkReport({
      patientName,
      patientAge,
      patientGender,
      disease,
      detectionResult,
      email,
    });

    // Save the report to the database
    const savedReport = await newReport.save();

    // Return the saved report as a response
    res.status(201).json({
      message: 'Report saved successfully.',
      report: savedReport,
    });
  } catch (error) {
    console.error('Error saving report:', error);
    res.status(500).json({ message: 'An error occurred while saving the report.' });
  }
});



// Route to save Alzheimer's Detection Report
app.post('/saveAlzReport', async (req, res) => {
  const { patientName, patientAge, patientGender, disease, detectionResult, condition, email } = req.body;

  try {
    // Validate required fields
    if (!patientName || !patientAge || !patientGender || !disease || !detectionResult || !condition || !email) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create a new ParkReport document
    const newReport = new AlzReport({
      patientName,
      patientAge,
      patientGender,
      disease,
      detectionResult,
      condition,
      email,
    });

    // Save the report to the database
    const savedReport = await newReport.save();

    // Return the saved report as a response
    res.status(201).json({
      message: 'Report saved successfully.',
      report: savedReport,
    });
  } catch (error) {
    console.error('Error saving report:', error);
    res.status(500).json({ message: 'An error occurred while saving the report.' });
  }
});


// Route to save Brain Stroke's Detection Report
app.post('/saveStrokeReport', async (req, res) => {
  const { patientName, patientAge, patientGender, disease, detectionResult, email } = req.body;

  try {
    // Validate required fields
    if (!patientName || !patientAge || !patientGender || !disease || !detectionResult || !email) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create a new ParkReport document
    const newReport = new StrokeReport({
      patientName,
      patientAge,
      patientGender,
      disease,
      detectionResult,
      email,
    });

    // Save the report to the database
    const savedReport = await newReport.save();

    // Return the saved report as a response
    res.status(201).json({
      message: 'Report saved successfully.',
      report: savedReport,
    });
  } catch (error) {
    console.error('Error saving report:', error);
    res.status(500).json({ message: 'An error occurred while saving the report.' });
  }
});



// POST route to save the diet plan
app.post('/save-diet-plan', async (req, res) => {
  const { email, shoppingList, breakfast, lunch, dinner } = req.body;

  try {
      const newDietPlan = new DietPlan({
        email,
          shoppingList,
          breakfast,
          lunch,
          dinner,
      });

      await newDietPlan.save();
      res.status(200).json({ message: 'Diet plan saved successfully!' });
  } catch (error) {
      res.status(500).json({ message: 'Error saving diet plan', error });
  }
});



// GET all diet plans by email
app.get('/get-diet-plans/:email', async (req, res) => {
  try {
      const email = req.params.email;
      const dietPlans = await DietPlan.find({ email });

      if (dietPlans.length === 0) {
          return res.status(404).json({ message: 'No diet plans found for this email' });
      }

      res.status(200).json(dietPlans);
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
});




//payment integration
app.post('/payment', async (req, res) => {
  
  const { patientName, patientEmail, neurologistName, neurologistEmail, date, time, fee, timingId } = req.body;

  // Convert the fee to a number
  const feeAmount = parseFloat(fee);


  // Validate the fee to ensure it's a valid number
  if (isNaN(feeAmount) || feeAmount <= 0) {
    return res.status(400).json({ error: 'Invalid fee amount' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: 'pkr',
            product_data: {
              name: `${patientName}'s Appointment with Dr. ${neurologistName}`,
              description: `Appointment on ${date} at ${time}`, 
            },
            unit_amount: Math.round(feeAmount * 100), // Convert to smallest currency unit
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      
      success_url: `http://localhost:3000/patient/paymentSuccess?patientName=${encodeURIComponent(patientName)}&patientEmail=${encodeURIComponent(patientEmail)}&neurologistName=${encodeURIComponent(neurologistName)}&neurologistEmail=${encodeURIComponent(neurologistEmail)}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}&fee=${encodeURIComponent(fee)}&timingId=${encodeURIComponent(timingId)}`,
      cancel_url: 'http://localhost:3000/patient/dashboard',
    });

    res.json({ id: session.id });

  } catch (error) {
    console.error('Error creating Stripe session:', error);
    res.status(500).json({ error: 'An error occurred while creating the payment session' });
  }
});




// save E-Prescription
app.post('/savepres', async (req, res) => {
  try {
    const newPrescription = new EPrescription({
      ...req.body,
      savedMonth: new Date().toLocaleString('default', { month: 'long' }), // Set the month when creating the prescription
      savedYear: new Date().getFullYear(), // Set the year when creating the prescription
    });
    await newPrescription.save();
    res.status(201).json({ message: 'E-Prescription saved successfully!' });
  } catch (error) {
    console.error('Error saving E-Prescription:', error);
    res.status(500).json({ message: 'Failed to save E-Prescription' });
  }
});




// Route to get all E-Prescriptions by appointmentId
app.get('/getpres/:appointmentId', async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const prescriptions = await EPrescription.find({ appointmentId });

    if (prescriptions.length === 0) {
      return res.status(404).json({ message: 'No E-Prescriptions found for this appointment ID' });
    }

    res.status(200).json(prescriptions);
  } catch (error) {
    console.error('Error fetching E-Prescriptions:', error);
    res.status(500).json({ message: 'Failed to fetch E-Prescriptions' });
  }
});




// GET all reports for a specific patient by email
app.get('/getReports/:email', async (req, res) => {
  const { email } = req.params;

  try {
    // Find reports for the given email from each collection
    const parkReports = await ParkReport.find({ email });
    const alzReports = await AlzReport.find({ email });
    const strokeReports = await StrokeReport.find({ email });

    // Combine all reports into a single array
    const allReports = [...parkReports, ...alzReports, ...strokeReports];

    // If no reports are found, send an empty array
    if (allReports.length === 0) {
      return res.status(404).json({ message: 'No reports found for this email.' });
    }

    // Send the combined reports as JSON
    res.json(allReports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch reports. Please try again later.' });
  }
});





// Endpoint to share a report
app.post('/shareReport', async (req, res) => {
  const { patientName, patientAge, patientGender, disease, detectionResult, email, createdAt, sharedWith } = req.body;

  try {
    // Create a new shared report document
    const sharedReport = new SharedReport({
      patientName,
      patientAge,
      patientGender,
      disease,
      detectionResult,
      email,
      createdAt,
      sharedWith,
    });

    // Save the shared report
    await sharedReport.save();
    res.status(201).json({ message: 'Report shared successfully!', sharedReport });
  } catch (error) {
    res.status(500).json({ message: 'Failed to share report', error });
  }
});





// GET /neurologists - Get list of all neurologists
app.get('/neurologists', async (req, res) => {
  try {
    const neurologists = await NeurologistModel.find(); // Fetch all neurologists
    res.json(neurologists);
  } catch (error) {
    console.error('Error fetching neurologists:', error);
    res.status(500).json({ message: 'Failed to fetch neurologists.' });
  }
});



// Route to get all shared reports for a specific neurologist
app.get('/sharedReports/:sharedWith', async (req, res) => {
  const { sharedWith } = req.params;

  try {
    // Find reports shared with the specified neurologist
    const sharedReports = await SharedReport.find({ sharedWith: sharedWith });
    res.status(200).json(sharedReports);
  } catch (err) {
    console.error('Error fetching shared reports:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});





// admin extract all non register neurologist
app.get('/api/not-register-neurologists', async (req, res) => {
  try {
    // Fetch all doctors from MongoDB where approved is not 'y'
    const doctors = await NeurologistModel.find({ approved: 'n' });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
});

//approving neurologist
app.put('/api/not-register-neurologists/:id', async (req, res) => {
  try {
    const neurologistId = req.params.id;
    
    // Update the 'approved' field to 'y'
    const updatedNeurologist = await NeurologistModel.findByIdAndUpdate(
      neurologistId,
      { approved: 'y' },
      { new: true }
    );
    res.status(200).json(updatedNeurologist);
  } catch (error) {
    res.status(500).json({ error: 'Failed to approve neurologist' });
  }
});

// deleting neurologist account after disapprove 
app.delete('/api/delete-neurologists/:id', async (req, res) => {
  try {
    const neurologistId = req.params.id;
    await NeurologistModel.findByIdAndDelete(neurologistId);
    res.status(200).json({ message: 'Neurologist removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove neurologist' });
  }
});

// fetching registered patients
app.get('/api/registered-patients', async (req, res) => {
  try {
    
    const patients = await PatientModel.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
});

// fetching registered and approved neurologists
app.get('/api/registered-neurologists', async (req, res) => {
  try {
    // Filter the neurologists where `approved` is true
    const neurologists = await NeurologistModel.find({ approved: "y" });
    
    res.status(200).json(neurologists);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch neurologists' });
  }
});



// Endpoint to fetch all ePrescriptions
app.get('/eprescriptions', async (req, res) => {
  try {
    const eprescriptions = await EPrescription.find();
    res.json(eprescriptions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch e-prescriptions' });
  }
});



// POST route to save a new neurologist rating
app.post('/neurologistrating', async (req, res) => {
  const { neurologistName, neurologistEmail, rating, review } = req.body;
  try {
    const newRating = new NeurologistRating({
      neurologistName,
      neurologistEmail,
      rating,
      review,
    });

    await newRating.save();
    res.status(201).json({ message: 'Rating submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save rating', error });
  }
});



// Route to calculate neurologist rankings
app.get('/neurologistranking', async (req, res) => {
  try {
    const ratings = await NeurologistRating.aggregate([
      {
        $group: {
          _id: { neurologistName: '$neurologistName', neurologistEmail: '$neurologistEmail' },
          averageRating: { $avg: '$rating' },
        },
      },
      {
        $sort: { averageRating: -1 }, // Sort by average rating in descending order
      },
    ]);

    const rankings = ratings.map((item) => ({
      neurologistName: item._id.neurologistName,
      neurologistEmail: item._id.neurologistEmail,
      averageRating: item.averageRating,
    }));

    res.status(200).json(rankings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch rankings', error });
  }
});




// POST route to save a new system rating
app.post('/rating', async (req, res) => {
  const { rating, review } = req.body;
  try {
    const newRating = new Rating({
      rating,
      review,
    });

    await newRating.save();
    res.status(201).json({ message: 'Rating submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save rating', error });
  }
});



// Route to fetch all ratings
app.get("/getrating", async (req, res) => {
  try {
    const ratings = await Rating.find({});
    res.status(200).json(ratings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch ratings", error: err });
  }
});

// Route to fetch all ratings
app.get("/getneurologistratings", async (req, res) => {
  try {
    const ratings = await NeurologistRating.find({});
    res.status(200).json(ratings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch ratings", error: err });
  }
});




// get no of disease detections
app.get("/getDiseaseNumbers", async (req, res) => {
  try {
    // Count the total number of reports in each collection
    const alzTotal = await AlzReport.countDocuments();
    const parkTotal = await ParkReport.countDocuments();
    const strokeTotal = await StrokeReport.countDocuments();

    // Count the negatives in each collection based on the conditions
    const alzNegatives = await AlzReport.countDocuments({
      detectionResult: "Non Demented",
    });
    const parkNegatives = await ParkReport.countDocuments({
      detectionResult: "healthy",
    });
    const strokeNegatives = await StrokeReport.countDocuments({
      detectionResult: "brain stroke negative",
    });

    // Calculate positives
    const alzPositives = alzTotal - alzNegatives;
    const parkPositives = parkTotal - parkNegatives;
    const strokePositives = strokeTotal - strokeNegatives;

    // Send the data for the pie chart
    res.json({
      diseaseData: [
        { label: "Positive", value: alzPositives + parkPositives + strokePositives, color: "#0088FE" },
        { label: "Negative", value: alzNegatives + parkNegatives + strokeNegatives, color: "#FF6347" },
      ]
    });
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Error fetching data");
  }
});



// chat routes
app.post("/send/:email", async (req, res) => {
  try {
    const { senderEmail, message } = req.body;
    const receiverEmail = req.params.email;

    // Validate input
    if (!senderEmail || !message || !receiverEmail) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if a conversation exists
    let conversation = await Conversation.findOne({
      participants: { $all: [senderEmail, receiverEmail] },
    });

    if (!conversation) {
      // Create a new conversation if none exists
      conversation = await Conversation.create({
        participants: [senderEmail, receiverEmail],
      });
    }

    // Create a new message
    const newMessage = await Message.create({
      senderEmail,
      receiverEmail,
      message,
    });

    // Add message to conversation
    conversation.messages.push(newMessage._id);
    await conversation.save();

    res.status(201).json({
      message: "Message sent successfully",
      newMessage,
    });
  } catch (error) {
    console.error("Error sending message:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Route to get messages between two participants
app.get("/getMessage/:email", async (req, res) => {
  try {
    const { senderEmail } = req.query;
    const receiverEmail = req.params.email;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderEmail, receiverEmail] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }
    
    res.status(200).json(conversation.messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
























const availabilityTimingRoutes = require('./routes/availabilityTimingRoutes');
app.use('/api/availability-timings', availabilityTimingRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

