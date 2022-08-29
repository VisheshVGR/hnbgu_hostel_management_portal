import React from "react"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Paper, Typography } from "@mui/material"

// carousel images
import img1 from "../../Assets/car/carimg1.png"
import img2 from "../../Assets/car/carimg2.jpg"
import img3 from "../../Assets/car/carimg3.jpeg"
import img4 from "../../Assets/car/carimg4.jpg"
import img5 from "../../Assets/car/carimg5.jpg"
import img6 from "../../Assets/car/carimg6.jpg"
import tiranga from "../../Assets/tiranga.jpg"

const Home = () => {

    return (
        <>
            <Box sx={{ margin: "0 10px" }}>
                <SimpleSlider />
            </Box>
            <Paper elevation={5} sx={{ width: "95%", marginY: 4, marginX: "auto", padding: 0 }}>
            <img src={tiranga} alt="Tiranga" style={{width:"100%"}}/>
            <Box sx={{padding:4}}>

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
