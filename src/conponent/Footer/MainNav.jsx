import * as React from 'react';
import { Box, styled } from '@mui/material';
import { Movie, Search, Tv, Whatshot } from '@mui/icons-material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useNavigate } from 'react-router-dom';


const WrapperBox = styled(Box)(({ theme }) => ({
    width: '100%',
    position: 'fixed',
    bottom: 0,
    background: '#2d313a',
    zIndex: 100
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
        <WrapperBox>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                style={{ background: 'inherit' }}
            >
                <BottomNavigationAction label="Trending" icon={<Whatshot />} style={{ color: "#fff" }} />
                <BottomNavigationAction label="Movies" icon={<Movie />} style={{ color: "#fff" }} />
                <BottomNavigationAction label="TV series" icon={<Search />} style={{ color: "#fff" }} />
                <BottomNavigationAction label="Search" icon={<Tv />} style={{ color: "#fff" }} />
            </BottomNavigation>
        </WrapperBox>
    );
}
