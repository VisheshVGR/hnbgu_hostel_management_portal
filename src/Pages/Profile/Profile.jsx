import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig"
import { doc, updateDoc } from "firebase/firestore";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from "@mui/material"


const Profile = ({ currUser, notify }) => {
    const theme = createTheme();
    const navigate = useNavigate()

    const [error, setError] = useState("")
    const [userData, setUserData] = useState({
        accountType: "",
        email: "",
        hostelName: "",
        name: "",
        phoneNo: "",
        roomNo: "",
        uid: "",
    })

    useEffect(() => {
        setError("")
    }, [])


    useEffect(() => {
        if (!currUser) {
            navigate("/login")
            return
        }

        const q = query(collection(db, "hnbgu_hostel_management_portal_users"), where("uid", "==", currUser.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let mytempinfo
            querySnapshot.forEach((doc) => {
                mytempinfo = { ...doc.data(), key: doc.id }
            });
            setUserData(mytempinfo)
        });

        return (() => {
            unsubscribe()
        })
    }, [currUser, navigate])


    const updateProfileFunction = async () => {
        try {
            const userRef = doc(db, "hnbgu_hostel_management_portal_users", userData.key);

            await updateDoc(userRef, {
                name: userData.name,
                phoneNo: userData.phoneNo,
                hostelName: userData.hostelName,
                roomNo: userData.roomNo,
            });

            notify("Profile Updated !", "success")
        } catch (error) {
            setError(error.code.substring(error.code.indexOf('/') + 1).replaceAll("-", " "))
            console.log(error)
        }
    }


    const handleChange = (event) => {
        const { name, value } = event.target
        setUserData({
            ...userData,
            [name]: value,
        })
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        setError("")
        if (!userData.name ||
            !userData.phoneNo ||
            !userData.hostelName ||
            !userData.roomNo) {
            setError("Please provide value in each field.");
            return;
        }
        if (userData.phoneNo.length !== 10) {
            setError("Enter 10 digit Phone No.");
            return;
        }

        updateProfileFunction()
    };


    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Paper elevation={6} sx={{
                        my: 3,
                        p: 3,
                        marginTop: 8,
                        marginBottom: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 3,
                    }}>
                        <Avatar alt={currUser ? currUser.displayName : ""} src={currUser ? currUser.photoURL : ""} sx={{ width: "100px", height: "100px", margin: 3, marginTop: -8 }} />

                        <Typography component="h1" variant="h5">
                            Update Profile
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} onChange={handleChange} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name=""
                                        value={userData.uid}
                                        label="Uer UID"
                                        type="text"
                                        id="uid"
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name=""
                                        value={userData.accountType}
                                        label="Account Type"
                                        type="text"
                                        id="accounttype"
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name=""
                                        type="text"
                                        disabled
                                        value={userData.email}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="name"
                                        value={userData.name}
                                        required
                                        fullWidth
                                        type="text"
                                        id="name"
                                        label="Full Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="phoneNo"
                                        label="Phone No"
                                        name="phoneNo"
                                        type="number"
                                        value={userData.phoneNo}
                                        autoComplete="tel-national"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">+91-</InputAdornment>,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="Hostel Name">Hostel Name</InputLabel>
                                        <Select
                                            labelId="Hostel Name Select"
                                            id="hostelName"
                                            value={userData.hostelName}
                                            label="Hostel Name"
                                            onChange={(e) => setUserData({ ...userData, hostelName: e.target.value })}
                                        >
                                            <MenuItem value={"Alaknanda Girls Hostel"}>Alaknanda Girls Hostel</MenuItem>
                                            <MenuItem value={"Bhagirathi Girls Hostel"}>Bhagirathi Girls Hostel</MenuItem>
                                            <MenuItem value={"Swami Vivekanand Boys Hostel"}>Swami Vivekanand Boys Hostel</MenuItem>
                                            <MenuItem value={"Yammuna Girls Hostel"}>Yammuna Girls Hostel</MenuItem>
                                            <MenuItem value={"Sri Dev Suman Boys Hostel"}>Sri Dev Suman Boys Hostel</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        name="roomNo"
                                        value={userData.roomNo}
                                        label="Room No"
                                        type="text"
                                        id="roomNo"
                                    />
                                </Grid>
                                {error ?
                                    <>
                                        <Grid item xs={12}>
                                            <Alert severity="error">{error}</Alert>
                                        </Grid>
                                    </>
                                    : <></>}
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Save Changes
                            </Button>
                        </Box>
                    </Paper>

                </Container>
            </ThemeProvider>
        </>
    )
}

export default Profile