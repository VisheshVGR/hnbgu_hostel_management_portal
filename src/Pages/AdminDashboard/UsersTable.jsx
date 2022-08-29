import React, { useState, useEffect } from "react"
import { db } from "../../Firebase/firebaseConfig"
import { collection, query, onSnapshot } from "firebase/firestore";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import UsersTableInfo from "./UsersTableInfo"

import Chip from '@mui/material/Chip';
import { Grid, Typography, Box, Tab } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';


const UsersTable = ({ currUser, myinfo, notify }) => {
    const [allUsers, setAllUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [tabPage, setTabPage] = useState('1');


    const [pageSize, setPageSize] = useState(5);

    const handleChangeTabPage = (event, newValue) => {
        setTabPage(newValue);
    };

    useEffect(() => {
        const q = query(collection(db, "hnbgu_hostel_management_portal_users"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const appointments = []
            querySnapshot.forEach((doc) => {
                const data = { ...doc.data(), key: doc.id }
                appointments.push(data)
            });
            setAllUsers(appointments)
        });

        return (() => {
            unsubscribe()
        })
    }, [])

    useEffect(() => {
        let index = 1
        const tempArr = allUsers.reduce((result, data) => {
            switch (tabPage) {
                case "2":
                    if (data.accountType !== "Student")
                        return result
                    break
                case "3":
                    if (data.accountType !== "Caretaker" && data.accountType !== "Warden" && data.accountType !== "Chief Warden")
                        return result
                    break
                case "4":
                    if (data.accountType !== "Admin")
                        return result
                    break
                default:
                    break
            }
            result.push({ ...data, id: index })
            index = index + 1
            return result
        }, [])

        setFilteredUsers(tempArr)
    }, [allUsers, tabPage])



    const columns = [
        { field: 'id', headerName: 'Sr No.', type: "number", width: 60 },
        { field: 'name', headerName: 'User Name', width: 200, renderCell: renderCellExpand },
        { field: 'email', headerName: 'Email', flex: 1, minWidth: 200, renderCell: renderCellExpand },
        { field: 'phoneNo', headerName: 'Phone No', width: 200, renderCell: renderCellExpand },
        {
            field: 'accountType', headerName: 'Type', sortable: false, width: 150,
            renderCell: (params) => {
                return (
                    <>
                        {
                            params.row.accountType === "Student" ?
                                <Chip label="Student" color="success" /> :
                                params.row.accountType === "Admin" ?
                                    <Chip label="Admin" color="error" /> :
                                    <Chip label={params.row.accountType} color="warning" />
                        }
                    </>
                )
            },

        },
        {
            field: 'Edit',
            headerName: 'Edit',
            width: 80,
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <UsersTableInfo currUser={params.row} notify={notify} />
                    </>
                )

            },
        },


    ];




    return (

        <>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <Typography variant="h3" sx={{ textAlign: "center", wordBreak: "break-word" }} gutterBottom>
                        All Users
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={tabPage}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList
                                    onChange={handleChangeTabPage}
                                    variant="scrollable"
                                    aria-label="lab API tabs example">
                                    <Tab label="All" value="1" />
                                    <Tab label="Student" value="2" />
                                    <Tab label="Officer" value="3" />
                                    <Tab label="Admin" value="4" />
                                </TabList>
                            </Box>
                        </TabContext>
                    </Box>

                    <DataGrid
                        rows={filteredUsers}
                        columns={columns}
                        pageSize={pageSize}
                        onPageSizeChange={(newPage) => setPageSize(newPage)}
                        rowsPerPageOptions={[5, 10, 20, 50]}
                        disableSelectionOnClick
                        disableColumnMenu
                        disableColumnFilter
                        disableColumnSelector
                        disableDensitySelector
                        autoHeight
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        componentsProps={{
                            toolbar: { showQuickFilter: true },
                        }}
                    />

                </Grid>
            </Grid>


        </>
    )
}

export default UsersTable





// For overflown visibility
function isOverflown(element) {
    return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
    );
}

const GridCellExpand = React.memo(function GridCellExpand(props) {
    const { width, value } = props;
    const wrapper = React.useRef(null);
    const cellDiv = React.useRef(null);
    const cellValue = React.useRef(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showFullCell, setShowFullCell] = React.useState(false);
    const [showPopper, setShowPopper] = React.useState(false);

    const handleMouseEnter = () => {
        const isCurrentlyOverflown = isOverflown(cellValue.current);
        setShowPopper(isCurrentlyOverflown);
        setAnchorEl(cellDiv.current);
        setShowFullCell(true);
    };

    const handleMouseLeave = () => {
        setShowFullCell(false);
    };

    React.useEffect(() => {
        if (!showFullCell) {
            return undefined;
        }

        function handleKeyDown(nativeEvent) {
            // IE11, Edge (prior to using Bink?) use 'Esc'
            if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
                setShowFullCell(false);
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [setShowFullCell, showFullCell]);

    return (
        <Box
            ref={wrapper}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
                alignItems: 'center',
                lineHeight: '24px',
                width: 1,
                height: 1,
                position: 'relative',
                display: 'flex',
            }}
        >
            <Box
                ref={cellDiv}
                sx={{
                    height: 1,
                    width,
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                }}
            />
            <Box
                ref={cellValue}
                sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
                {value}
            </Box>
            {showPopper && (
                <Popper
                    open={showFullCell && anchorEl !== null}
                    anchorEl={anchorEl}
                    style={{ width: "auto", maxWidth: "80vw", marginLeft: -17 }}
                >
                    <Paper
                        elevation={5}
                        style={{ minHeight: wrapper.current.offsetHeight - 3 }}
                    >
                        <Typography variant="body2" style={{ padding: 8 }}>
                            {value}
                        </Typography>
                    </Paper>
                </Popper>
            )}
        </Box>
    );
});

GridCellExpand.propTypes = {
    value: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
};

function renderCellExpand(params) {
    return (
        <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
    );
}

renderCellExpand.propTypes = {
    /**
     * The column of the row that the current cell belongs to.
     */
    colDef: PropTypes.object.isRequired,
    /**
     * The cell value, but if the column has valueGetter, use getValue.
     */
    value: PropTypes.string.isRequired,
};