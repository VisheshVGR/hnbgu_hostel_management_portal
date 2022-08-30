import React, { useState } from "react"
import { Route, Routes } from "react-router-dom"
import { auth } from "./Firebase/firebaseConfig"
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "./Firebase/firebaseConfig"

// toast message
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';

// pages
import NavigationBar from "./Components/NavigationBar"
import FooterBar from "./Components/FooterBar"
import Home from "./Pages/Home/Home"
import AllComplaints from "./Pages/AllComplaints/AllComplaints"
import Login from "./Pages/Login/Login"
import Signup from "./Pages/Signup/Signup"
import Profile from "./Pages/Profile/Profile"
import StudentDashboard from "./Pages/StudentDashboard/StudentDashboard"
import OfficerDashboard from "./Pages/OfficerDashboard/OfficerDashboard"
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard"
import Hostels from "./Pages/Hostels/Hostels"
import ContactUs from "./Pages/ContactUs/ContactUs"


const App = () => {
  // USE STATE
  const [currUser, setCurrUser] = useState(null);

  // toast message
  const notify = (msg, type) => toast(msg, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type: type,
    theme: "colored"
  });

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      setCurrUser(user)

    } else {
      setCurrUser(null)
    }
  });

  const [allComplaints, setAllComplaints] = React.useState([])

  React.useEffect(() => {
    if (allComplaints.length > 0) {
      allComplaints.forEach(async (comp) => {
        if (new Date() - new Date(comp.issuedDate) > 604800000) {
          const compRef = doc(db, "hnbgu_hostel_management_portal_complaints", comp.key);
          if (comp.issuedTo === "Caretaker") {
            await updateDoc(compRef, {
              issuedTo: "Warden"
            });
          }
          if (comp.issuedTo === "Warden") {
            await updateDoc(compRef, {
              issuedTo: "Chief Warden"
            });
          }
        }
      })
    }
  }, [allComplaints])

  React.useEffect(() => {

    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "hnbgu_hostel_management_portal_complaints"));

      const tempComp = []
      querySnapshot.forEach((doc) => {
        const data = { ...doc.data(), key: doc.id, issuedDate: doc.data().issuedDate.toDate() }
        tempComp.push(data)
      });
      setAllComplaints(tempComp)
    }

    getData()

  }, [])

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >

        <NavigationBar currUser={currUser} />
        <Container maxWidth="xl">

          <Routes>
            <Route path="/" element={<Home currUser={currUser} notify={notify} />} />
            <Route path="/allComplaints" element={<AllComplaints currUser={currUser} notify={notify} />} />
            <Route path="/hostels" element={<Hostels currUser={currUser} notify={notify} />} />
            <Route path="/contactus" element={<ContactUs currUser={currUser} notify={notify} />} />
            <Route path="/login" element={<Login currUser={currUser} notify={notify} />} />
            <Route path="/signup" element={<Signup currUser={currUser} notify={notify} />} />
            <Route path="/profile" element={<Profile currUser={currUser} notify={notify} />} />
            <Route path="/studentDashboard" element={<StudentDashboard currUser={currUser} notify={notify} />} />
            <Route path="/officerDashboard" element={<OfficerDashboard currUser={currUser} notify={notify} />} />
            <Route path="/adminDashboard" element={<AdminDashboard currUser={currUser} notify={notify} />} />
          </Routes>

        </Container>
        <FooterBar />

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Box>
    </>
  );
}

export default App;
