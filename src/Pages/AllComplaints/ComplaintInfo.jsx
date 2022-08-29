import * as React from 'react';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';

export default function ResponsiveDialog({ complaintData }) {
    const [open, setOpen] = React.useState(false);
    const [remarks, setRemarks] = React.useState(complaintData.remarks ? complaintData.remarks : "");
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <IconButton aria-label="Info" color="primary" onClick={handleClickOpen}>
                <InfoIcon />
            </IconButton>


            <Dialog
                fullScreen={fullScreen}
                fullWidth
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Complain Details "}
                    {complaintData.complaintStatus === "pending" ?
                        <Chip label="Pending" /> :
                        complaintData.complaintStatus === "approved" ?
                            <Chip label="Resolved" color="success" /> :
                            <Chip label="Declined" color="error" />
                    }
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant="subtitle2" sx={{ display: "inline" }}>Name: </Typography>
                        <Typography variant="body2" sx={{ display: "inline" }}>{complaintData.name}<br /></Typography>
                        <Typography variant="subtitle2" sx={{ display: "inline" }}>Email: </Typography>
                        <Typography variant="body2" sx={{ display: "inline" }}>{complaintData.email}<br /></Typography>
                        <Typography variant="subtitle2" sx={{ display: "inline" }}>Phone No: </Typography>
                        <Typography variant="body2" sx={{ display: "inline" }}>+91-{complaintData.phoneNo}<br /></Typography>
                        <Typography variant="subtitle2" sx={{ display: "inline" }}>Hostel: </Typography>
                        <Typography variant="body2" sx={{ display: "inline" }}>{complaintData.hostelName}<br /></Typography>
                        <Typography variant="subtitle2" sx={{ display: "inline" }}>Room No: </Typography>
                        <Typography variant="body2" sx={{ display: "inline" }}>{complaintData.roomNo}<br /></Typography>
                        <Typography variant="subtitle2" sx={{ display: "inline" }}>Issued To: </Typography>
                        <Typography variant="body2" sx={{ display: "inline" }}>{complaintData.issuedTo}<br /></Typography>
                        <Typography variant="subtitle2" sx={{ display: "inline" }}>Complain Type: </Typography>
                        <Typography variant="body2" sx={{ display: "inline" }}>{complaintData.complaintType}<br /></Typography>
                        <Typography variant="subtitle2" sx={{ display: "inline" }}>Registered On: </Typography>
                        <Typography variant="body2" sx={{ display: "inline" }}>{(new Date(complaintData.issuedDate)).toLocaleString()}<br /></Typography>

                        <TextField
                            id="description"
                            label="Description"
                            multiline
                            fullWidth
                            sx={{ marginY: 2 }}
                            maxRows={6}
                            value={complaintData.complaintDescription}
                            disabled
                        />
                        <TextField
                            id="remarks"
                            label="Remarks"
                            multiline
                            fullWidth
                            sx={{ marginY: 0 }}
                            maxRows={6}
                            disabled
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>


        </>
    );
}
