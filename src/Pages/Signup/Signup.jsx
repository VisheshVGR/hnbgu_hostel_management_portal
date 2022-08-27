import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/firebaseConfig"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

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
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Signup = ({ currUser }) => {
    const navigate = useNavigate()
    const theme = createTheme();

    const [error, setError] = useState("")
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
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
                displayName: `${userData.firstName}${userData.lastName ? ` ${userData.lastName}` : ``}`,
            })
            console.log('Signed Up Successfully !');
            navigate("/studentDashboard")
            // console.log(auth)
        } catch (error) {
            setError(error.code.substring(error.code.indexOf('/') + 1).replaceAll("-", " "))
            console.log(error)
            console.log(error)
        }
    }

    const sendVerificationEmail = () => {
        auth.currentUser.sendEmailVerification()
            .then(() => {
                console.log('Verification Email Sent Successfully !');
            })
            .catch(error => {
                console.error(error);
            })
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
        if (!userData.firstName ||
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
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        value={userData.firstName}
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        value={userData.lastName}
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
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