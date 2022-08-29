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
import TextField from '@mui/material/TextField';

export default function ResponsiveDialog({ complaintData, myinfo }) {
    const [open, setOpen] = React.useState(false);
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
                        <Typography variant="subtitle2" sx={{ display: "inline" }}>Issued To: </Typography>
                        <Typography variant="body2" sx={{ display: "inline" }}>{complaintData.issuedTo}<br /></Typography>
                        <Typography variant="subtitle2" sx={{ display: "inline" }}>Complain Type: </Typography>
                        <Typography variant="body2" sx={{ display: "inline" }}>{complaintData.complaintType}<br /></Typography>

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
                            maxRows={6}
                            value={complaintData.remarks ? complaintData.remarks : ""}
                            disabled
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
