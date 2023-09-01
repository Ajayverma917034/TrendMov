import React from 'react'
import { useEffect, useState } from 'react'
import { Typography, Box, styled } from '@mui/material'
import useGenres from '../../../hooks/useGenres'
import axios from 'axios'
import Genres from '../../genres/Genres'
import SingleContent from '../../SingleContent/SingleContent'
import CustomPagination from '../../pagination/CustomPagination'

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
const Series = () => {
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const genreforURL = useGenres(selectedGenres);

    const fetchMovies = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
        );
        setContent(data.results);
        setNumOfPages(data.total_pages);
    };
    useEffect(() => {
        fetchMovies()
        // eslint-disable-next-line
    }, [page, genreforURL]);
    return (
        <>
            <StyledTypography>Trending</StyledTypography>
            <Genres
                type="tv"
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
                setPage={setPage}
            />
            <StyleBox >
                {
                    content && content.map((c) => (
                        <SingleContent
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_data}
                            media_type='tv'
                            vote_average={c.vote_average}

                        />
                    ))
                }

            </StyleBox>
            <CustomPagination setPage={setPage} numberOfPages={numOfPages} />
        </>
    )
}

export default Series;