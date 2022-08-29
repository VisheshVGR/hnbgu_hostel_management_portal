import React from "react"
import HostelInfo from "./HostelInfo"
import Box from '@mui/material/Box';

import hostelDetails from "./hostelDetails"

const Hostels = () => {
    return (
        <>
            <Box sx={{ display: "flex", flexFlow: "row wrap", justifyContent: "center", alignItems: "center", gap: 5, marginY: 5 }}>
                {
                    hostelDetails.map((hostelDet) => {
                        return (
                            <HostelInfo hostelDet={hostelDet} />
                        )
                    })
                }

            </Box>
        </>
    )
}

export default Hostels