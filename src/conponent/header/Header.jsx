import { Box, styled } from "@mui/material"




const StyledBox = styled(Box)(({ theme }) => ({

    width: '100%',
    cursor: 'pointer',
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    textTransform: 'uppercase',
    backgroundColor: '#39445a',
    fontSize: '5vw',
    padding: 10,
    alignItems: 'center',
    boxShadow: '0px 1px 5px black',
    color: 'white',
    zIndex: 100,
    [theme.breakpoints.down('md')]: {
        // paddingTop: '0',
        fontSize: '6.4vh',
    }
}))


const Header = () => {
    return (
        <StyledBox onClick={() => window.scroll(0, 0)}>Entertainment Hub</StyledBox>
    )
}


export default Header;