

import { Box, createTheme, ThemeProvider } from '@mui/material';
import Pagination from '@mui/material/Pagination';

import React from 'react'

const dartTheme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#fff',
        },
    },
})

const CustomPagination = ({ setPage, numberOfPages = 10 }) => {
    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0, 0)
    }
    return (
        <Box
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                marginTop: 10,
            }}
        >
            <ThemeProvider theme={dartTheme}>
                <Pagination count={numberOfPages} onChange={(e) => handlePageChange(e.target.textContent)}
                    hideNextButton
                    hidePrevButton
                    color='primary'
                />
            </ThemeProvider>
        </Box>
    )
}

export default CustomPagination