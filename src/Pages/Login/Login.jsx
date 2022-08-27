import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/firebaseConfig"
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Login = ({currUser}) => {
    const navigate = useNavigate()
    const theme = createTheme();

    const [error, setError] = useState("this is")
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    })

    useEffect(()=>{
        if(currUser){
            navigate("/studentDashboard")
            return
        }   
    },[currUser, navigate])

    useEffect(() => {
        setError("")
    }, [])

    const signInEmailFunction = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, userData.email, userData.password)
            console.log('Signed In Successfully !');
            navigate("/studentDashboard")
        } catch (error) {
            setError(error.code.substring(error.code.indexOf('/') + 1).replaceAll("-", " "))
            console.log(error)
        }
    }

    const forgotPassword = async () => {
        try {

            await sendPasswordResetEmail(auth, userData.email)
            alert("Password reset email sent!")
        }
        catch (error) {
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
        signInEmailFunction()
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
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} onChange={handleChange} noValidate sx={{ mt: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>

                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        value={userData.email}
                                        autoComplete="email"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>

                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        value={userData.password}
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
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
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2" onClick={forgotPassword}>
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2" onClick={() => navigate("/signup")}>
                                        Don't have an account? Sign Up
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

export default Login