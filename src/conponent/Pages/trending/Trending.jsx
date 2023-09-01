

import { Typography, Box, styled } from '@mui/material'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SingleContent from '../../SingleContent/SingleContent';
import CustomPagination from '../../pagination/CustomPagination';

const StyleBox = styled(Box)`
   display: flex;
   flex-wrap: wrap;
   justify-content: space-around;
`
const StyledTypography = styled(Typography)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    textTransform: 'uppercase',
    fontSize: 35,
    [theme.breakpoints.down("md")]: {
        paddingTop: 20
    }
}))
const Trending = () => {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const fetchTrendig = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
        );
        // console.log(data);
        setContent(data.results);
    }
    useEffect(() => {
        fetchTrendig();
        // eslint-disable-next-line
    }, [page])
    return (
        <>
            <StyledTypography>Trending</StyledTypography>
            <StyleBox >
                {
                    content && content.map((c) => (

                        <SingleContent
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_data}
                            media_type={c.media_type}
                            vote_average={c.vote_average}

                        />
                    ))
                }

            </StyleBox>
            <CustomPagination setPage={setPage} />
        </>
    )
}

export default Trending