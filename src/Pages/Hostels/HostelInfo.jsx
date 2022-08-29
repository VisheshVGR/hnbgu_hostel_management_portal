import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ hostelDet }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Card sx={{ minWidth: 300, cursor: "pointer" }} elevation={6} onClick={handleClickOpen}>
                <CardMedia
                    component="img"
                    height="140"
                    image={hostelDet.img}
                    alt={hostelDet.hostelName}
                />
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {hostelDet.hostelFor} Hostel
                    </Typography>
                    <Typography variant="h5" component="div">
                        {hostelDet.hostelName}
                    </Typography>
                </CardContent>
            </Card>


            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', background: "#008336" }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            autoFocus
                            color="inherit"
                            onClick={handleClose}
                            aria-label="Close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {hostelDet.hostelFor} Hostel
                        </Typography>
                    </Toolbar>
                </AppBar>
                <img src={hostelDet.img} alt={hostelDet.hostelName} style={{ maxHeight:"70vh" }} />
                <Box sx={{ padding: 3 }}>
                    <Typography variant="h3" component="h3">
                        {hostelDet.hostelName}
                    </Typography>
                    <Typography variant="body2" component="p" dangerouslySetInnerHTML={{ __html: hostelDet.desc }}>
                    </Typography>
                </Box>

            </Dialog>
        </div>
    );
}
