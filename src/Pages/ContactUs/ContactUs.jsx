import React from "react"
import Box from '@mui/material/Box';
import { Paper, Typography } from "@mui/material"

import ContactUsImg from "../../Assets/ContactUs.png"

const ContactUs = () => {
    return (
        <>
            <Paper elevation={3} sx={{ marginY: 3, padding: 4 }}>
                <Typography variant="h3" align="center">Contact Us</Typography>
                <Typography variant="body1" sx={{paddingY: 4}}>
                    The various Hostels of the University are managed and governed by a team of Wardens working
                    under the supervision of the Chief Warden and patronage of the Vice-Chancellor. The offices of the various
                    wardens are located in the respective hostels supervised by them, and the office of the Chief Warden is
                    located in second floor of the Students Activities Centre, Birla Campus, HNB Garhwal University, Srinagar
                    Garhwal. The administrative structure of the hostels are as below:
                </Typography>
                <img src={ContactUsImg} alt="Contact Us" style={{ width: "100%" }} />
            </Paper>
        </>
    )
}

export default ContactUs