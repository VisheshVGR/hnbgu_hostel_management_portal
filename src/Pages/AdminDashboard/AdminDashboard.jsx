import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig"


import { Paper } from "@mui/material"
import UsersTable from "./UsersTable"
import MyInfo from "../../Components/MyInfo"

const AdminDashboard = ({ currUser, notify }) => {
    const navigate = useNavigate()

    const [myinfo, setmyinfo] = useState({})

    useEffect(() => {
        if (myinfo.accountType) {
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
                <UsersTable currUser={currUser} myinfo={myinfo} notify={notify} />
            </Paper>
        </>
    )
}

export default AdminDashboard