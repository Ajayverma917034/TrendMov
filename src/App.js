import { Box, Container, styled } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SimpleBottomNavigation from "./conponent/Footer/MainNav";
import Header from "./conponent/header/Header";
import Trending from "./conponent/Pages/trending/Trending"
import Movies from "./conponent/Pages/Movies/Movies";
import Search from "./conponent/Pages/Search/Search";
import Series from "./conponent/Pages/Series/Series";
import Slider from "../src/conponent/Slider"
import MainPage from "./conponent/MainFrontPage/MainPage";
const StyledBox = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: '#39445a',
  color: '#fff',
  paddingTop: 170,
  paddingBottom: 70,
  [theme.breakpoints.down('lg')]: {
    paddingTop: 70
  }
}))


function App() {
  return (
    <>

      <BrowserRouter>
        <MainPage />
        {/* <Header /> */}
        <StyledBox>
          <Container>
            <Routes>
              <Route path='/' element={<Trending />} />
              <Route path='/movies' element={<Movies />} />
              <Route path='/series' element={<Series />} />
              <Route path='/search' element={<Search />} />
            </Routes>
          </Container>
        </StyledBox>
        {/* <SimpleBottomNavigation /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
