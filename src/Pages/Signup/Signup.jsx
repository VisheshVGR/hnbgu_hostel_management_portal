import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/firebaseConfig"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig"

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Signup = ({ currUser }) => {
    const navigate = useNavigate()
    const theme = createTheme();

    const [error, setError] = useState("")
    const [userData, setUserData] = useState({
        name: "",
        phoneNo: "",
        email: "",
        password: "",
        confirmPassword: "",
        hostelName: "",
        roomNo: "",
    })

    useEffect(() => {
        if (currUser) {
            navigate("/studentDashboard")
            return
        }
    }, [currUser, navigate])

    useEffect(() => {
        setError("")
    }, [])

    const signUpEmailFunction = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
            await updateProfile(userCredential.user, {
                displayName: userData.name,
            })

            // console.log(auth)
            // console.log(userCredential.user.uid)
            const newUserData = {
                uid: userCredential.user.uid,
                // Student | Caretaker | Warden | Chief Warden | Admin
                accountType: "Student",
                name: userData.name,
                phoneNo: userData.phoneNo,
                email: userData.email,
                hostelName: userData.hostelName,
                roomNo: userData.roomNo,
            }
            console.log(newUserData)

            const res = await addDoc(collection(db, "hnbgu_hostel_management_portal_users"),
                {
                    ...newUserData
                });
            console.log(res);
            console.log('Signed Up Successfully !');
            navigate("/studentDashboard")

        } catch (error) {
            setError(error.code.substring(error.code.indexOf('/') + 1).replaceAll("-", " "))
            console.log(error)
        }
    }

    // const sendVerificationEmail = () => {
    //     auth.currentUser.sendEmailVerification()
    //         .then(() => {
    //             console.log('Verification Email Sent Successfully !');
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         })
    // }

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
            !userData.email ||
            !userData.password ||
            !userData.confirmPassword) {
            setError("Please provide value in each field.");
            return;
        }
        if (userData.password.length < 6 || userData.confirmPassword.length < 6) {
            setError("Use minimum 6 charactres in password.");
            return;
        }
        if (userData.password !== userData.confirmPassword) {
            setError("Password does not match");
            return;
        }
        if (userData.phoneNo.length !== 10) {
            setError("Enter 10 digit Phone No.");
            return;
        }

        signUpEmailFunction()
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            marginBottom: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} onChange={handleChange} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
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
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        value={userData.email}
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        value={userData.password}
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="confirmPassword"
                                        value={userData.confirmPassword}
                                        label="Confirm Password"
                                        type="password"
                                        id="confirmPassword"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    {/* <TextField
                                        fullWidth
                                        name="hostelName"
                                        value={userData.hostelName}
                                        label="Hostel Name"
                                        type="text"
                                        id="hostelName"
                                    /> */}
                                    <FormControl fullWidth>
                                        <InputLabel id="Hostel Name">Hostel Name</InputLabel>
                                        <Select
                                            labelId="Hostel Name Select"
                                            id="hostelName"
                                            value={userData.hostelName}
                                            label="Hostel Name"
                                            onChange={(e) => setUserData({ ...userData, hostelName: e.target.value })}
                                        >
                                            <MenuItem value={"Sri Dev Suman Boys Hostel"}>Sri Dev Suman Boys Hostel</MenuItem>
                                            <MenuItem value={"Swami Vivekananda Boys Hostel"}>Swami Vivekananda Boys Hostel</MenuItem>
                                            <MenuItem value={"Forestry Boys Hostel"}>Forestry Boys Hostel</MenuItem>
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
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="#" variant="body2" onClick={() => navigate("/login")}>
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    )
}

export default Signup