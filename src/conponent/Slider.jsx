import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Box, styled, Typography } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { unavailable, img_500 } from '../config/config';

const responsive = {

    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const Component = styled(Box)`
    margin-top: 5px;
    background:  #ffffff;
`

const Image = styled('img')({
    width: '93%',
    height: 'auto'
})
const Text = styled(Typography)`
    line-height: 1.7;
`




const Slide = ({ }) => {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const fetchTrendig = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
        );
        // console.log(data);d
        const newData = data.results;
        // console.log(newData)
        const data2 = newData.slice(0, 3);
        // console.log(data2);
        setContent(data2);
    }
    useEffect(() => {
        fetchTrendig();
        // eslint-disable-next-line
    }, [page])

    return (
        <Component>
            <Carousel
                responsive={responsive}
                swipeable={false}
                draggable={false}
                showDots={true}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={4000}
                containerClass="carousel-container"
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {content && content.map((c) => (
                    <Link >
                        <Box style={{ textAlign: "center" }}>
                            <Image src={c.backdrop_path ? `${img_500}/${c.backdrop_path}` : unavailable} alt={c.title} style={{ borderRadius: 10 }} />
                            {/* <Typography>{c.title}</Typography> */}

                        </Box>
                    </Link>
                )
                )}
            </Carousel>
        </Component>
    )
}

export default Slide;