import React from "react"
import Box from '@mui/material/Box';
import { Typography, Container } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import IconButton from '@mui/material/IconButton';

const Footer = () => {
    return (
        <>
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: "#131313",
                    color: "white"
                }}
            >
                <Container maxWidth="xl">
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexFlow: "column" }}>
                        <a href="https://github.com/VisheshVGR/hnbgu_hostel_management_portal" target="_blank" rel="noreferrer" >
                            <IconButton aria-label="Github" style={{ color: "white" }}>
                                <GitHubIcon />
                            </IconButton>
                        </a>
                        <Box>
                        <Typography  sx={{ cursor: "pointer", display:"inline-block", marginX:1 }} onClick={() => window.open("https://www.hnbgu.ac.in/home", '_blank')}>
                        HNBGU site
                        </Typography>

                        </Box>
                        <Typography sx={{ textAlign: "center" }}>
                            HNBGU Hostel Management Portal<br />2022 &#169; All Rights Reserved
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default Footer