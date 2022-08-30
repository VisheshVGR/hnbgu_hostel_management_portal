import * as React from 'react';
import Button from '@mui/material/Button';
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
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig"

export default function ResponsiveDialog({ complaintData, myinfo, notify }) {
    const [open, setOpen] = React.useState(false);
    const [remarks, setRemarks] = React.useState(complaintData.remarks ? complaintData.remarks : "");
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const complainRef = doc(db, "hnbgu_hostel_management_portal_complaints", complaintData.key);
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

                        <Typography variant="h6" component="p" sx={{ marginY: 2 }}>Select response -</Typography>
                        <Box sx={{ display: "flex", flexFlow: "row wrap", alignItems: "center", justifyContent: "center", gap: 3 }}>
                            <Button variant="outlined" color="success" onClick={async () => { await updateDoc(complainRef, { complaintStatus: "approved" }); notify("Complain Status Updated!", "info") }}>
                                Resolved
                            </Button>
                            <Button variant="outlined" color="warning" onClick={async () => { await updateDoc(complainRef, { complaintStatus: "pending" }); notify("Complain Status Updated!", "info") }}>
                                Pending
                            </Button>
                            {
                                myinfo.accountType === "Caretaker" ?
                                    <>
                                        <Button variant="outlined" color="secondary" onClick={async () => { await updateDoc(complainRef, { issuedTo: "Warden" }); notify("Complain promoted to Warden!", "success") }}>
                                            Esclate
                                        </Button>
                                    </> : <></>
                            }
                            {
                                myinfo.accountType === "Warden" ?
                                    <>
                                        <Button variant="outlined" color="secondary" onClick={async () => { await updateDoc(complainRef, { issuedTo: "Chief Warden" }); notify("Complain promoted to Chief Warden!", "success") }}>
                                            Esclate
                                        </Button>
                                    </> : <></>
                            }

                            <Button variant="outlined" color="error" onClick={async () => { await updateDoc(complainRef, { complaintStatus: "declined" }); notify("Complain Status Updated!", "info") }}>
                                Decline
                            </Button>
                        </Box>
                        <TextField
                            id="remarks"
                            label="Remarks (if any)"
                            multiline
                            fullWidth
                            sx={{ marginY: 3 }}
                            maxRows={6}
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                        />
                        <Button variant="contained" color="success" onClick={async () => { await updateDoc(complainRef, { remarks: remarks }); setRemarks(""); notify("Remarks saved!", "info") }}>
                            Save Remarks
                        </Button>

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
