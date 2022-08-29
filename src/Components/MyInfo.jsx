import * as React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

export default function MediaControlCard({ currUser, myinfo }) {

    return (
        <Card sx={{ background:"rgba(255,255,255,0.9)",marginY: 3, display: 'flex', justifyContent: "start", alignItems: "center", flexFlow: { xs: "column", md: "row" } }}>
            <Avatar alt={currUser ? currUser.displayName : ""} src={currUser ? currUser.photoURL : ""} sx={{ width: "100px", height: "100px", margin: 3 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {myinfo && myinfo.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {`${myinfo && myinfo.email} | +91-${myinfo && myinfo.phoneNo}`}
                    </Typography>
                    {
                        myinfo && myinfo.accountType === "Student" ?
                            <>
                                <Typography variant="subtitle2" sx={{ display: "inline" }}>Hostel: </Typography>
                                <Typography variant="body2" sx={{ display: "inline" }}>{myinfo && myinfo.hostelName}<br /></Typography>
                                <Typography variant="subtitle2" sx={{ display: "inline" }}>Room No: </Typography>
                                <Typography variant="body2" sx={{ display: "inline" }}>{myinfo && myinfo.roomNo}<br /></Typography>
                            </> :
                            <>
                                <Typography variant="subtitle2" sx={{ display: "inline" }}>Account Type: </Typography>
                                <Typography variant="body2" sx={{ display: "inline" }}>{myinfo && myinfo.accountType}<br /></Typography>
                            </>
                    }


                </CardContent>
            </Box>

        </Card>
    );
}
