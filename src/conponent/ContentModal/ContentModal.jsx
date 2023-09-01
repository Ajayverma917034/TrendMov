import * as React from 'react';
import { Box, Button, Fade, styled, Typography } from '@mui/material';
import { img_500, unavailable, unavailableLandscape } from '../../config/config';
import Modal from '@mui/material/Modal';
import { YouTube } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { addEllipsis } from '../../utils';

import '../../scrollbar.css';

const style1 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '70%',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const StyleButton = styled(Button)(({ theme }) => ({

    display: 'flex',
    flexDirection: 'column',
    width: 210,
    // height: 400,
    padding: 5,
    margin: '5px 0',
    background: '#282c34',
    borderRadius: 10,
    position: 'relative',
    [theme.breakpoints.down("md")]: {

    }
}))

const paperSX = {
    "&:hover": {
        background: '#fff',
        color: '#000'
    },
};

const StyledTypography = styled(Typography)`
margin-top: 12px;
display: flex;
height: 40%;
overflow-y: scroll;
padding: 15px;
border-radius: 20px;
scrollbar-width: thin; /* Firefox */
box-shadow: inset 0 0 5px #000000;
text-align: justify;
`
const LargeImg = styled('img')(({ theme }) => ({
    display: 'flex',
    [theme.breakpoints.down("md")]: {
        display: 'none',
    }
}))


const SmallImg = styled('img')(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.down("md")]: {
        display: 'flex',
    }
}))

const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-around',
    height: '100%',
    width: '100%',
    overflowY: 'scroll',
    scrollbarWidth: 'none',
    [theme.breakpoints.down("md")]: {
        flexDirection: 'column',
    }
}))


const StyledBox2 = styled(Box)(({ theme }) => ({
    marginLeft: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.down("md")]: {
        marginLeft: 0,
    }
}))

const StyledTypography2 = styled(Typography)(({ theme }) => ({
    marginTop: 25,
    height: "12%",
    fontSize: 40,
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center',
    [theme.breakpoints.down("md")]: {
        marginTop: 15,
        fontSize: 30,
    }
}))

export default function ContentModal({ children, media_type, id }) {
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = useState()
    const [video, setVideo] = useState()
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fetchData = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );

        setContent(data);
        // console.log(data);
    };

    const fetchVideo = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        // console.log(data);
        setVideo(data.results[0]?.key);
    };


    useEffect(() => {
        fetchData();
        fetchVideo();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <StyleButton onClick={handleOpen} sx={paperSX}>{children}</StyleButton>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Fade in={open}>
                    {
                        content && (
                            <Box sx={style1} className="Scrollbar" >
                                <StyledBox>
                                    <LargeImg
                                        src={
                                            content.poster_path
                                                ? `${img_500}/${content.poster_path}`
                                                : unavailable
                                        }
                                        alt={content.name || content.title}
                                        style={{ objectFit: 'contain', borderRadius: 10 }}
                                    />
                                    <SmallImg
                                        src={
                                            content.backdrop_path
                                                ? `${img_500}/${content.backdrop_path}`
                                                : unavailableLandscape
                                        }
                                        alt={content.name || content.title}
                                        className="ContentModal__landscape"
                                    />
                                    <StyledBox2>
                                        <StyledTypography2>
                                            {content.name || content.title} (
                                            {(
                                                content.first_air_date ||
                                                content.release_date ||
                                                "-----"
                                            ).substring(0, 4)}
                                            )
                                        </StyledTypography2>
                                        {content.tagline && (
                                            <i className="tagline">{content.tagline}</i>
                                        )}

                                        <StyledTypography className="ContentModal__description">
                                            {content.overview}
                                        </StyledTypography>

                                        {/* <div>
                                            <Carousel /> 
                                        </div> */}

                                        <Button
                                            variant="contained"
                                            startIcon={<YouTube />}
                                            color="secondary"
                                            target="__blank"
                                            href={`https://www.youtube.com/watch?v=${video}`}
                                            style={{ marginTop: 10 }}
                                        >
                                            Watch the Trailer
                                        </Button>
                                    </StyledBox2>
                                </StyledBox>
                            </Box>
                        )
                    }

                </Fade>
            </Modal>

        </div>
    );
}