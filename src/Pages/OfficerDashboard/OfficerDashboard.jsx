import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { collection, addDoc, query, onSnapshot, where, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig"

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { Paper } from "@mui/material"
import ComplaintsTable from "./ComplaintsTable";
import MyInfo from "../../Components/MyInfo"
import DeleteIcon from '@mui/icons-material/Delete';


import { Typography } from "@mui/material"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TextField from '@mui/material/TextField';


const OfficerDashboard = ({ currUser, notify }) => {
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
                <ComplaintsTable currUser={currUser} myinfo={myinfo} notify={notify} />
            </Paper>
            <SideNotification notify={notify} />
        </>
    )
}

export default OfficerDashboard


const SideNotification = ({ notify }) => {
    const [newNotification, setNewNofitication] = useState("")

    const [allNotifications, setAllNotifications] = useState([])

    useEffect(() => {
        const q = query(collection(db, "hnbgu_hostel_management_portal_notifications"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let tempNotific = []
            querySnapshot.forEach((doc) => {
                tempNotific.push({ ...doc.data(), key: doc.id });
            });
            setAllNotifications(tempNotific)
        });

        return (() => {
            unsubscribe()
        })
    }, [])

    const addNotification = async () => {
        if (newNotification.length === 0) {
            notify("Notification cannot be empty", "warning")
            return
        }
        try {
            await addDoc(collection(db, "hnbgu_hostel_management_portal_notifications"), {
                notification: newNotification,
            });
            setNewNofitication("")
            notify("Notification Added", "success")

        }
        catch (error) {
            notify("Error Occured", "error")
            console.log(error)
        }
    }

    return (
        <>
            <Paper elevation={2} sx={{ margin: 2, bgcolor: "#008336" }}>
                <Typography variant="h6" sx={{ padding: 2, color: "white", display: 'flex', alignItems: "center", justifyContent: "center" }}>
                    <NotificationsIcon sx={{ marginRight: 1 }} />Notification / Circulars
                </Typography>
                <Box sx={{ paddingX: 4, paddingBottom: 2, gap: 2, display: "flex", justifyContent: "center", alignItems: "center", flexFlow: "column nowrap" }}>
                    <TextField
                        name="newNotification"
                        value={newNotification}
                        fullWidth
                        type="text"
                        id="newNotification"
                        placeholder="New Notification"
                        onChange={(e) => setNewNofitication(e.target.value)}
                        sx={{ background: "white" }}
                    />
                    <Button variant="contained" color="info" onClick={addNotification}>
                        Add Notification
                    </Button>
                </Box>
                <List component="marquee" direction="up" sx={{ width: '100%', height: "300px", bgcolor: 'background.paper' }}>


                    {
                        allNotifications.map((notific) => {
                            return (
                                <>
                                    <ListItem>

                                        <Button variant="outlined" sx={{marginRight:1}} color="error" onClick={async () => { await deleteDoc(doc(db, `hnbgu_hostel_management_portal_notifications`, notific.key)); notify("Notification Deleted", "success") }}>
                                            <DeleteIcon />
                                        </Button>
                                        <ListItemText
                                            primary={notific.notification}
                                        />
                                    </ListItem>
                                    <Divider component="li" />
                                </>
                            )
                        })
                    }
                </List>
            </Paper>
        </>
    )
}
