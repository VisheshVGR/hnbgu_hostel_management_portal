import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig"
import NewComplaintForm from "./NewComplaintForm"
import MyComplaints from "./MyComplaints"
import MyInfo from "../../Components/MyInfo"

import { Paper } from "@mui/material"

// hostel pic
import alak from "../../Assets/hostel/alak.jpg"
import bhag from "../../Assets/hostel/bhag.jpg"
import sds from "../../Assets/hostel/sds.jpg"
import vive from "../../Assets/hostel/vive.jpg"
import yamuna from "../../Assets/hostel/yamuna.jpg"

const StudentDashboard = ({ currUser, notify }) => {
    const navigate = useNavigate()

    const [myinfo, setmyinfo] = useState({})

    useEffect(() => {
        let bg = document.getElementById("root")
        // bg.style.background = "#aaa";
        // bg.style.background = `url(${alak})`
        if (myinfo) {
            console.log(myinfo.hostelName)
            switch (myinfo.hostelName) {
                case "Alaknanda Girls Hostel": bg.style.background = `url(${alak})`; break;
                case "Bhagirathi Girls Hostel": bg.style.background = `url(${bhag})`; break;
                case "Swami Vivekanand Boys Hostel": bg.style.background = `url(${vive})`; break;
                case "Yammuna Girls Hostel": bg.style.background = `url(${yamuna})`; break;
                case "Sri Dev Suman Boys Hostel": bg.style.background = `url(${sds})`; break;
                default: bg.style.background = "#0f5e2021"; break;
            }
        }
        bg.style.backgroundPosition = "center";
        bg.style.backgroundSize = "cover";
        bg.style.backgroundRepeat = "no-repeat";
        bg.style.backgroundAttachment = "fixed";

        return (() => {
            bg.style.background = "#0f5e2021";
        })

    }, [myinfo])

    useEffect(() => {
        if (myinfo && myinfo.accountType) {
            if (myinfo.accountType === "Student") {
                navigate("/studentDashboard")
            } else if (myinfo.accountType === "Caretaker" ||
                myinfo.accountType === "Warden" ||
                myinfo.accountType === "Chief Warden") {
                navigate("/officerDashboard")
            } else if (myinfo.accountType === "Admin") {
                navigate("/adminDashboard")
            }
        }
    }, [myinfo, navigate])

    useEffect(() => {
        if (!currUser) {
            navigate("/login")
            return
        }

        const q = query(collection(db, "hnbgu_hostel_management_portal_users"), where("uid", "==", currUser.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let mytempinfo
            querySnapshot.forEach((doc) => {
                mytempinfo = doc.data()
            });
            setmyinfo(mytempinfo)
        });

        return (() => {
            unsubscribe()
        })
    }, [currUser, navigate])

    return (
        <>
            <MyInfo currUser={currUser} myinfo={myinfo} />
            <Paper elevation={6} sx={{ my: 3, p: 3 }}>
                <NewComplaintForm currUser={currUser} myinfo={myinfo} notify={notify} />
            </Paper>
            <Paper elevation={6} sx={{ my: 3, p: 3 }}>
                <MyComplaints currUser={currUser} myinfo={myinfo} notify={notify} />
            </Paper>
        </>
    )
}

export default StudentDashboard