
import { img_300, unavailable } from "../../config/config.js"
import { Box, Typography } from "@mui/material"
import React from 'react'
import Badge from '@mui/material/Badge';
import ContentModal from "../ContentModal/ContentModal.jsx";
import { addEllipsis } from "../../utils.js";

const SingleContent = ({ id, poster, title, date, media_type, vote_average }) => {
    // console.log(poster)
    const rate = Math.round((vote_average + Number.EPSILON) * 10) / 10;
    return (
        <ContentModal media_type={media_type} id={id}>
            <Badge badgeContent={rate} color={rate > 6 ? "primary" : "secondary"} style={{ position: 'initial' }} />
            <img src={poster ? `${img_300}/${poster}` : unavailable} alt={title} style={{ borderRadius: 10, width: '150' }} />
            <Typography style={{ width: '100%', textAlign: 'center', fontSize: 17, padding: '8px 3px' }}>{addEllipsis(title)}</Typography>
            <Box style={{ display: 'flex', width: '100%', justifyContent: 'space-between', opacity: .9 }}>
                <Typography style={{ fontSize: 15 }} >{media_type === "tv" ? "TV Series" : "Movie"}</Typography>
                <Typography style={{ fontSize: 15 }}>{date}</Typography>
            </Box>
        </ContentModal>

    )
}

export default SingleContent