import React from "react"
import Box from '@mui/material/Box';
import { Typography, Container, Link } from '@mui/material';
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
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[200]
                            : theme.palette.grey[800],
                }}
            >
                <Container maxWidth="xl">
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexFlow: "column" }}>
                        <a href="https://github.com/VisheshVGR/hnbgu_hostel_management_portal" target="_blank" rel="noreferrer" style={{ color: "black" }}>
                            <IconButton aria-label="Github">
                                <GitHubIcon />
                            </IconButton>
                        </a>
                        <Typography sx={{textAlign:"center"}}>
                        HNBGU Hostel Management Portal<br />2022 &#169; All Rights Reserved
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default Footer