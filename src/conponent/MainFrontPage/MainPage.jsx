import React from 'react'
import SimpleBottomNavigation from './Navbar'
import { Box, Grid, styled, Typography } from '@mui/material'
import Slide from '../Slider'

const LeftGrid = styled(Grid)`

`
const WebName = styled(Typography)`
    fontSize: 30,
    color: '#fff'

`
const WebName1 = styled(Box)`

`


const MainPage = () => {
    return (<>

        <SimpleBottomNavigation />
        {/* <Grid container alignItems="stretch" spacing={3} style={{ paddingTop: '104px' }}>
            <Grid item lg={8} md={8} sm={12} xs={12}>
                <Slide />

            </Grid>
            <Grid item lg={4} md={4} sm={0} xs={0}>
                Heloo
            </Grid>
        </Grid>; */}
    </>
    )
}

export default MainPage