import * as React from 'react';
import { Box, styled } from '@mui/material';
import { Movie, Search, Tv, Whatshot } from '@mui/icons-material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';




const StyledBox = styled(Box)(({ theme }) => ({

    width: '100%',
    cursor: 'pointer',
    position: 'fixed',
    display: 'flex',
    justifyContent: 'space-around',
    textTransform: 'uppercase',
    backgroundColor: '#000',
    fontSize: '3vw',
    padding: 10,
    alignItems: 'center',
    boxShadow: '0px 1px 5px black',
    color: 'white',
    zIndex: 100,
    [theme.breakpoints.down('sm')]: {
        // paddingTop: '0',
        fontSize: '6.4vh',
        flexDirection: 'column'
    }
}))

const BottomNav = styled(BottomNavigation)(({ theme }) => ({

    display: 'flex',
    [theme.breakpoints.down('sm')]: {

        display: 'none',
    }
}))
const BottomNavi = styled(BottomNavigation)(({ theme }) => ({

    display: 'none',
    [theme.breakpoints.down('sm')]: {

        display: 'flex',
    }
}))
const StyledDivider = styled(Divider)(({ theme }) => ({

    display: 'none',
    background: '#fff',
    width: '100%',
    [theme.breakpoints.down('sm')]: {

        display: 'block',
    }
}))
export default function SimpleBottomNavigation() {
    const [value, setValue] = React.useState(0);

    const navigate = useNavigate();

    React.useEffect(() => {
        if (value === 0)
            navigate("/");
        else if (value === 1)
            navigate("/movies")
        else if (value === 2)
            navigate("/series")
        else if (value === 3)
            navigate("/search")
    }, [value, navigate])
    return (
        <StyledBox>
            <Box>TrendMOV</Box>
            <BottomNav
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                style={{ background: 'inherit', justifyContent: 'space-evenly' }}
            >
                <BottomNavigationAction label="Trending" icon={<Whatshot />} style={{ color: "#fff" }} />
                <BottomNavigationAction label="Movies" icon={<Movie />} style={{ color: "#fff" }} />

                <BottomNavigationAction label="TV_series" icon={<Tv />} style={{ color: "#fff" }} />
                <BottomNavigationAction label="Search" icon={<Search />} style={{ color: "#fff", background: 'inherit', color: 'inherit' }} />
            </BottomNav>
            <StyledDivider />
            <BottomNavi
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                style={{ background: 'inherit', justifyContent: 'space-evenly' }}
            >
                <BottomNavigationAction label="Trending" icon={<Whatshot />} style={{ color: "#fff" }} />
                <BottomNavigationAction label="Movies" icon={<Movie />} style={{ color: "#fff" }} />

                <BottomNavigationAction label="TV_series" icon={<Tv />} style={{ color: "#fff" }} />
                <BottomNavigationAction label="Search" icon={<Search />} style={{ color: "#fff", background: 'inherit', color: 'inherit' }} />
            </BottomNavi>



        </StyledBox>
    );
}
