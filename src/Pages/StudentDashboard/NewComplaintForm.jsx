import React, { useState } from "react"
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig"

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography } from "@mui/material";

const NewComplaintForm = ({ currUser, myinfo, notify }) => {
    const [error, setError] = useState("")
    const [complaintInfo, setComplaintInfo] = useState({
        complaintType: "",
        complaintDescription: "",
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setComplaintInfo({
            ...complaintInfo,
            [name]: value,
        })
    }

    const registerComplaint = async () => {
        const newComplaint = {
            ...myinfo,
            ...complaintInfo,
            issuedTo: "Caretaker",
            complaintStatus: "pending",
            issuedDate: new Date(),
        }
        try {
            await addDoc(collection(db, "hnbgu_hostel_management_portal_complaints"),
                {
                    ...newComplaint
                });
            setComplaintInfo({
                complaintType: "",
                complaintDescription: "",
            })
            notify("Complain Registered", "success")

        }
        catch (error) {
            setError(error.code.substring(error.code.indexOf('/') + 1).replaceAll("-", " "))
            console.log(error)
        }

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setError("")
        if (complaintInfo.complaintType === "") {
            setError("Enter Complaint Type.");
            return;
        }
        if (complaintInfo.complaintDescription === "") {
            setError("Describe the Issue.");
            return;
        }

        if (myinfo.name === "" ||
            myinfo.hostelName === "" ||
            myinfo.phoneNo === "" ||
            myinfo.email === "" ||
            myinfo.roomNo === "") {
            notify("Complete Your Profile First", "warning")
            return
        }

        registerComplaint()
    }
    return (
        <>
            <Box component="form" noValidate onSubmit={handleSubmit} onChange={handleChange} sx={{ my: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h3" sx={{ textAlign: "center", wordBreak: "break-word" }} gutterBottom>
                            Raise A Complaint
                        </Typography>
                    </Grid>
                    <Grid container spacing={2} item xs={12} lg={6} sx={{ mt: { xs: 5, lg: "auto" }, mb: "auto", mx: "auto" }}>

                        {/* Real Form */}


                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="Complaint Type">Complaint Type</InputLabel>
                                <Select
                                    labelId="Complaint Type"
                                    id="complaintType"
                                    required
                                    value={complaintInfo.complaintType}
                                    label="Complaint Type"
                                    onChange={(e) => setComplaintInfo({ ...complaintInfo, complaintType: e.target.value })}
                                >
                                    <MenuItem value={"Electricity"}>Electricity</MenuItem>
                                    <MenuItem value={"Cleanliness"}>Cleanliness</MenuItem>
                                    <MenuItem value={"Plumbing"}>Plumbing</MenuItem>
                                    <MenuItem value={"Mess"}>Mess</MenuItem>
                                    <MenuItem value={"Carpentary"}>Carpentary</MenuItem>
                                    <MenuItem value={"Civil"}>Civil</MenuItem>
                                    <MenuItem value={"WiFi"}>WiFi</MenuItem>
                                    <MenuItem value={"Other"}>Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                name="complaintDescription"
                                value={complaintInfo.complaintDescription}
                                required
                                fullWidth
                                multiline
                                maxRows={6}
                                id="complaintDescription"
                                label="Description"
                            />
                        </Grid>

                        {error ?
                            <>
                                <Grid item xs={12}>
                                    <Alert severity="error">{error}</Alert>
                                </Grid>
                            </>
                            : <></>}

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                            >
                                Register
                            </Button>
                        </Grid>

                    </Grid>



                </Grid>
            </Box>


        </>
    )
}

export default NewComplaintForm