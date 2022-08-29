import React from "react"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Paper, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import ReportIcon from '@mui/icons-material/Report';
import Face6Icon from '@mui/icons-material/Face6';
// carousel images
import img1 from "../../Assets/car/carimg1.png"
import img2 from "../../Assets/car/carimg2.jpg"
import img3 from "../../Assets/car/carimg3.jpeg"
import img4 from "../../Assets/car/carimg4.jpg"
import img5 from "../../Assets/car/carimg5.jpg"
import img6 from "../../Assets/car/carimg6.jpg"
import tiranga from "../../Assets/tiranga.jpg"

const Home = () => {
    let navigate = useNavigate();

    return (
        <>
            <Box sx={{ margin: "0 10px" }}>
                <SimpleSlider />
            </Box>
            <Paper elevation={5} sx={{ width: "95%", marginY: 4, marginX: "auto", padding: 0 }}>
                <img src={tiranga} alt="Tiranga" style={{ width: "100%" }} />
                <Box sx={{ padding: 3, display: "flex", alignItems: "center", justifyContent: "center", gap: 3, flexFlow: "wrap row" }}>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{ px: 3, py: 1 }}
                        onClick={() => navigate("/studentDashboard")}
                    >
                        <ReportIcon sx={{ marginRight: 1 }} />Register Complain
                    </Button>
                    <Button
                        color="success"
                        variant="contained"
                        sx={{ px: 3, py: 1 }}
                        onClick={() => navigate("/signup")}
                    >
                        <Face6Icon sx={{ marginRight: 1 }} />
                        New User
                    </Button>
                </Box>

                <Box sx={{ padding: 4 }}>

                    <Typography variant="h4" sx={{ marginBottom: 3, textDecoration: "underline", textAlign: "center" }}>
                        Instruction to Applicants
                    </Typography>
                    <ul>
                        <li>
                            <Typography variant="body1" sx={{ marginBottom: 3 }}>

                                Candidate should have a valid Email id and Mobile number. Applicant have to enter all the education qualifications and upload photo and signature. Pay application fee online.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body1" sx={{ marginBottom: 3 }}>

                                Admission is restricted to full time regular students of the various University deparments of study and research.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body1" sx={{ marginBottom: 3 }}>

                                Applicants who got allotment should download "Allotment Memo" after remitting the fee due to University through the online payment gate way. Only those candidates who remit the fee due to University (SC/ST candidates – Rs 50/-, Others – Rs. 620/- ) shall be able to download the allotment memo. The allotment memo can be downloaded by clicking on the link "Click here to print your Allotment Memo" and should be produced before university when taking admission.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body1" sx={{ marginBottom: 3 }}>

                                The students should report in the University on or before date mensioned in the memo and should produce the documents for verification.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body1" sx={{ marginBottom: 3 }}>

                                Failure to report for admission by candidate in the allotted hostel at the stipulated time and date will result in the forfeiture of his/her chance for admission to hostel.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body1" sx={{ marginBottom: 3 }}>

                                The allotment is done solely based on the details given by the candidate in online application. Any discrepancy in the online details furnished by the candidates with the original documents submitted at the time of admissions will lead to the cancellation of allotment.
                            </Typography>
                        </li>

                    </ul>


                </Box>
            </Paper>


        </>
    )
}

export default Home


const SimpleSlider = () => {
    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        arrows: false,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        adaptiveHeight: true,
    };
    return (
        <Slider {...settings} >
            <div>
                <img src={img2} alt="" style={{ width: "100%", height: "60vh" }} />
            </div>
            <div>
                <img src={img5} alt="" style={{ width: "100%", height: "60vh" }} />
            </div>
            <div>
                <img src={img6} alt="" style={{ width: "100%", height: "60vh" }} />
            </div>
            <div>
                <img src={img1} alt="" style={{ width: "100%", height: "60vh" }} />
            </div>
            <div>
                <img src={img3} alt="" style={{ width: "100%", height: "60vh" }} />
            </div>
            <div>
                <img src={img4} alt="" style={{ width: "100%", height: "60vh" }} />
            </div>
        </Slider>
    );
}
