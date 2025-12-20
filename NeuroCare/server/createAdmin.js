const mongoose = require('mongoose');
const AdminModel = require('./models/Admin');

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/NeuroCare')
  .then(() => {
    console.log('Connected to MongoDB successfully');
    createAdmin();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

async function createAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await AdminModel.findOne({ email: 'admin@neurocare.com' });
    
    if (existingAdmin) {
      console.log('Admin already exists:');
      console.log('Email:', existingAdmin.email);
      console.log('Password:', existingAdmin.password);
    } else {
      // Create new admin
      const admin = await AdminModel.create({
        email: 'admin@neurocare.com',
        password: 'admin123'
      });
      
      console.log('Admin created successfully:');
      console.log('Email:', admin.email);
      console.log('Password:', admin.password);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}
