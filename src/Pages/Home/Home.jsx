import React from "react"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Box from '@mui/material/Box';

// carousel images
import img1 from "../../Assets/car/carimg1.png"
import img2 from "../../Assets/car/carimg2.jpg"
import img3 from "../../Assets/car/carimg3.jpeg"
import img4 from "../../Assets/car/carimg4.jpg"
import img5 from "../../Assets/car/carimg5.jpg"
import img6 from "../../Assets/car/carimg6.jpg"

const Home = () => {

    return (
        <>
            <Box sx={{ margin: "0 10px" }}>
                <SimpleSlider />
            </Box>
        </>
    )
}

export default Home


const SimpleSlider = () => {
    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        adaptiveHeight: true,
    };
    return (
        <Slider {...settings}>
            <div>
                <img src={img2} alt="" style={{ width: "100%", height: "50vh" }} />
            </div>
            <div>
                <img src={img5} alt="" style={{ width: "100%", height: "50vh" }} />
            </div>
            <div>
                <img src={img6} alt="" style={{ width: "100%", height: "50vh" }} />
            </div>
            <div>
                <img src={img1} alt="" style={{ width: "100%", height: "50vh" }} />
            </div>
            <div>
                <img src={img3} alt="" style={{ width: "100%", height: "50vh" }} />
            </div>
            <div>
                <img src={img4} alt="" style={{ width: "100%", height: "50vh" }} />
            </div>
        </Slider>
    );
}
