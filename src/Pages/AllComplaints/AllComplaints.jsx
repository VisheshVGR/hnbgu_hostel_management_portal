import React from "react"
import { Paper } from "@mui/material"

import ComplaintsTable from "./ComplaintsTable"

const AllComplaints = () => {

    return (
        <>
            <Paper elevation={6} sx={{ my: 3, p: 3 }}>
                <ComplaintsTable />
            </Paper>
        </>
    )
}

export default AllComplaints