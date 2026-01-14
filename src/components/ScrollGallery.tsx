'use client';

import { Box, Container, Typography, Button, useMediaQuery, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import GalleryDesktop from './gallery/GalleryDesktop';
import GalleryMobile from './gallery/GalleryMobile';

export default function ScrollGallery() {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md')); // true se sotto 'md'


    return (
        <>
            {isMobile ? <GalleryMobile /> : <GalleryDesktop />}
        </>
    );
}