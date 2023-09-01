import { Box, TextField, createTheme, Tabs, Tab, ThemeProvider, Button, Typography, styled } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
// import { Search } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search';
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


const Search = () => {
    const [searchText, setSearchText] = useState("")
    const [content, setContent] = useState()
    const [numOfPages, setNumOfPages] = useState()

    const [type, setType] = useState(0);
    const [page, setPage] = useState(1)
    const darkTheme = createTheme({
        palette: {
            type: 'dark',
            primary: {
                main: '#fff',
            },
        },
    })


    const fetchSearch = async () => {
        try {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY
                }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
            );
            setContent(data.results);
            setNumOfPages(data.total_pages);
            // console.log(data);
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
        // eslint-disable-next-line
    }, [type, page]);

    return (
        <Box>
            <ThemeProvider theme={darkTheme}>
                <Box style={{ display: 'flex' }}>
                    <TextField
                        style={{ flex: 1, color: '#fff', outline: '#fff' }}
                        label="search"
                        variant='filled'
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button variant='contained' style={{ marginLeft: 10 }}
                        onClick={fetchSearch}
                    > <SearchIcon /></Button>
                </Box>

                <Tabs value={type} indicatorColor='primary' textColor='primary'
                    onChange={(event, newValue) => {
                        setType(newValue);
                        setPage(1);
                    }}
                    style={{ paddingBottom: '5' }}
                >
                    <Tab style={{ width: '50%' }} label="Search Movies" />
                    <Tab style={{ width: '50%' }} label="Search TV Series" />
                </Tabs>
            </ThemeProvider>

            <Box>
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
                                media_type={type ? "tv" : "movie"}
                                vote_average={c.vote_average}

                            />
                        ))
                    }
                    {
                        searchText &&
                        !content &&
                        (type ? <Typography> No Series Found</Typography> : <Typography>No Moves found</Typography>)
                    }

                </StyleBox>
                {
                    numOfPages > 1 && (

                        <CustomPagination setPage={setPage} />
                    )
                }
            </Box>
        </Box>
    )

}

export default Search