import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import NeurologistDashboard from './components/NeurologistDashboard';
import Appointments from './components/Appointments';
import AvailabilityTimings from './components/AvailabilityTimings';
import Chats from './components/Chats';
import SharedMedicalReports from './components/SharedMedicalReports';
import PatientDashboard from './components/PatientDashboard';
import BookAppointment from './components/BookAppointment';
import PatientBookedAppointments from './components/PatientBookedAppointments';
import PatientVirtualConsultation from './components/PatientVirtualConsultation';
import PatientEPrescription from './components/PatientEPrescription';
import PatientMedicalReports from './components/PatientMedicalReports';
import ChatWithNeurologist from './components/ChatWithNeurologist';
import PatientRegister from './components/PatientRegister';
import PatientLogin from './components/PatientLogin';
import NeurologistRegister from './components/NeurologistRegister';
import NeurologistLogin from './components/NeurologistLogin';
// import AdminLogin from './components/AdminLogin';
// import AdminDashboard from './components/AdminDashboard';
import Payment from './components/Payment';
import About from './components/About';
import PatientProfile from './components/PatientProfile';
import NeurologistProfile from './components/NeurologistProfile';
import PaymentSuccess from './components/PaymentSuccess';
import RoomPage from './components/Room';
import GenPres from './components/GenPres';
import ViewPres from './components/ViewPres';
import Reports from './components/Reports';
import RegisteredPatient from './components/admin/RegisteredPatient';
import RegisteredNeurologist from './components/admin/RegisteredNeurologist';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import SolutionReport from './components/SolutionReport';
import RateNeurologist from './components/RateNeurologist';
import NeurologistRanking from './components/NeurologistRanking';
import Ratings from './components/Ratings';
import NeurologistRatings from './components/NeurologistRatings';
import SystemRatings from './components/SystemRatings';
import NeurologistChat from './components/chatApp/chatApp/NeurologistChat';
import PatientChat from './components/chatApp/chatApp/PatientChat';
import Help from './components/Help';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/About" element={<About />}></Route>
      <Route path="/PatientRegister" element={<PatientRegister />}></Route>
      <Route path="/PatientLogin" element={<PatientLogin />}></Route>
      <Route path="/NeurologistRegister" element={<NeurologistRegister />}></Route>
      <Route path="/NeurologistLogin" element={<NeurologistLogin />}></Route>
      <Route path="/AdminLogin" element={<AdminLogin />}></Route>
        
        <Route path="/" element={<HomePage />} />
        <Route path="/neurologist/dashboard" element={<NeurologistDashboard />} />
        <Route path="/neurologist/appointments" element={<Appointments />} />
        <Route path="/neurologist/availability" element={<AvailabilityTimings />} />
        <Route path="/neurologist/reports" element={<SharedMedicalReports />} />
        <Route path="/neurologist/profile" element={<NeurologistProfile />} />

        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/patient/profile" element={<PatientProfile />} />
        <Route path="/patient/book-appointment" element={<BookAppointment />} />
        <Route path="/patient/booked-appointments" element={<PatientBookedAppointments />} />
        <Route path="/patient/virtual-consultation" element={<PatientVirtualConsultation />} />
        <Route path="/patient/e-prescription" element={<PatientEPrescription />} />
        <Route path="/patient/share-medical-reports" element={<PatientMedicalReports />} />
        <Route path="/patient/chat-with-neurologist" element={<PatientChat />} />
        <Route path="/payment" element={<Payment />}></Route>

        <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
        <Route path="/patient/paymentSuccess" element={<PaymentSuccess />}></Route>
        <Route path='/room/:roomId' element={<RoomPage/>}/>
        <Route path='/genpres/:appointmentId' element={<GenPres/>}/>
        <Route path='/viewpres/:appointmentId' element={<ViewPres/>}/>
        <Route path='/reports' element={<Reports/>}/>

        <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
        <Route path="/admin/registered-patients" element={<RegisteredPatient />}></Route>
        <Route path="/admin/registered-neurologists" element={<RegisteredNeurologist />}></Route>
        <Route path="/AdminLogin" element={<AdminLogin />}></Route>

        <Route path='/solutionreport' element={<SolutionReport/>}/>
        <Route path='/rateneurologist' element={<RateNeurologist/>}/>
        <Route path='/neurologistranking' element={<NeurologistRanking/>}/>
        <Route path='/ratings' element={<Ratings/>}/>
        <Route path='/neurologistratings' element={<NeurologistRatings/>}/>
        <Route path='/systemratings' element={<SystemRatings/>}/>

        <Route path='/neurologist/chats' element={<NeurologistChat/>}/>
        <Route path='/help' element={<Help/>}/>

      </Routes>
    </Router>
  );
};

export default App;
