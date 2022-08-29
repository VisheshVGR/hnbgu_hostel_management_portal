import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig"
import NewComplaintForm from "./NewComplaintForm"
import MyComplaints from "./MyComplaints"
import MyInfo from "../../Components/MyInfo"

import { Paper } from "@mui/material"

const StudentDashboard = ({ currUser, notify }) => {
    const navigate = useNavigate()

    const [myinfo, setmyinfo] = useState({})

    console.log(document.body.style)

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
            <Paper elevation={0} sx={{ my: 3, p: 3 }}>
                <MyInfo currUser={currUser} myinfo={myinfo}/>
            </Paper>
            <Paper elevation={6} sx={{ my: 3, p: 3 }}>
                <NewComplaintForm currUser={currUser} myinfo={myinfo} notify={notify}/>
            </Paper>
            <Paper elevation={6} sx={{ my: 3, p: 3 }}>
                <MyComplaints currUser={currUser} myinfo={myinfo} notify={notify}/>
            </Paper>
        </>
    )
}

export default StudentDashboard