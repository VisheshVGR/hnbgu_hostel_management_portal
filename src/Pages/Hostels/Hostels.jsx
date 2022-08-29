import React from "react"
import HostelInfo from "./HostelInfo"
import Box from '@mui/material/Box';
import { Paper, Typography } from "@mui/material"

import hostelDetails from "./hostelDetails"
import BoysHostelList from "../../Assets/hostel/BoysHostelList.png"
import GirlsHostelList from "../../Assets/hostel/GirlsHostelList.png"

const Hostels = () => {
    return (
        <>
            <Paper elevation={3} sx={{ marginTop: 4, padding: 3 }}>
                <Typography variant="h4" sx={{ marginBottom: 2 }} align="center">
                    Activities organized by the hostelers
                </Typography>
                <Typography variant="h6">
                    Cultural
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                    Organizing cultural activities including folk songs/dance, plays, debate, painting competition etc has been a regular feature of the hostels and thus during 2010-11 also all these acivities were organized in hostels of different campuses. In these programmes, a large number of students have participated.
                </Typography>
                <Typography variant="h6">
                    Student counseling
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                    A career counseling program was held to prepare students in the changing world, enabling them to identify the prospective career options so that they may channelize their energy in right direction. Information on current career options was provided by a team of specialists. The issues and concerns of the students regarding their career were identified by the counselors and guidance was offered during this program.
                    Camps were organised to inform and educate the students about environmental issues. The objective of this program was to spread awareness amongst students about the various threats to our eco-system and to encourage the students to participate actively in the environment related programmes. The programmes were also organized to educate the students against ragging.
                </Typography>
                <Typography variant="h6">
                    Social Useful Productive Work (SUPW)
                </Typography>
                <Typography variant="body2">
                    During 2010-11 a drive for cleaning the hostels in all three campuses was initiated in all the campuses, in which almost all the students participated actively. The students were also encouraged to participate in the blood donation camps and also in different national programmes e.g. Pulse Polio programme. Hostellers have actively participated in Red Ribbon programme (against HIV, AIDS). The students are encouraged to get involved in community related services.
                </Typography>

            </Paper>


            <Box sx={{ display: "flex", flexFlow: "row wrap", justifyContent: "center", alignItems: "center", gap: 5, marginY: 5 }}>
                {
                    hostelDetails.map((hostelDet) => {
                        return (
                            <HostelInfo hostelDet={hostelDet} />
                        )
                    })
                }

            </Box>



            <Paper elevation={3} sx={{ marginBottom: 4, padding: 3 }}>
                <Typography variant="h4" sx={{ marginBottom: 2, textDecoration: "underline" }} align="center">Boys Hostels</Typography>
                <img src={BoysHostelList} alt="Boys Hostel List" style={{width:"100%"}}/>
            </Paper>

            <Paper elevation={3} sx={{ marginBottom: 4, padding: 3, textDecoration: "underline" }}>
                <Typography variant="h4" sx={{ marginBottom: 2 }} align="center">Girls Hostels</Typography>
                <img src={GirlsHostelList} alt="Grils Hostel List" style={{width:"100%"}}/>

            </Paper>

        </>
    )
}

export default Hostels