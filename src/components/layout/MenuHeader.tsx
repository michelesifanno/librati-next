'use client';

import React, { useState, useEffect, MouseEvent, KeyboardEvent } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  Typography,
  useMediaQuery,
  Grid,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import WestIcon from '@mui/icons-material/West';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';

import { toggleChoice, clearExpiredSession } from '@/slices/choicesSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function MenuHeader() {
  const dispatch = useAppDispatch();
  const choices = useAppSelector((state) => state.choices.items);

  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    dispatch(clearExpiredSession());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGoBack = () => {
    router.back();
  };

  const toggleDrawer =
    (open: boolean) =>
    (event: MouseEvent | KeyboardEvent) => {
      if (
        event.type === 'keydown' &&
        'key' in event &&
        (event.key === 'Tab' || event.key === 'Shift')
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: scrolled ? '#111125' : 'transparent',
          boxShadow: scrolled ? 2 : 'none',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                py: 2,
              }}
            >
              <Box
                onClick={handleGoBack}
                sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                <WestIcon sx={{ pr: 1, fontSize: 36 }} />
                <Typography>Indietro</Typography>
              </Box>

              <Box
                onClick={toggleDrawer(true)}
                sx={{ cursor: 'pointer', position: 'relative' }}
              >
                <FavoriteIcon
                  sx={{ fontSize: 36, color: choices.length > 0 ? 'red' : '#fff' }}
                />
                {choices.length > 0 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -8,
                      right: -8,
                      backgroundColor: 'red',
                      color: '#fff',
                      borderRadius: '50%',
                      width: 22,
                      height: 22,
                      fontSize: 14,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {choices.length}
                  </Box>
                )}
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: isMobile ? '100vw' : 500, p: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Le tue scelte</Typography>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {choices.length > 0 ? (
            <List>
              {choices.map((item, index) => (
                <Grid
                  key={index}
                  container
                  sx={{ py: 3, borderBottom: '1px solid #ddd' }}
                >
                  <Grid xs={10}>
                    <Typography variant="h6">{item.nome}</Typography>
                  </Grid>
                  <Grid xs={2} sx={{ textAlign: 'right' }}>
                    <IconButton onClick={() => dispatch(toggleChoice(item))}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
            </List>
          ) : (
            <Typography sx={{ mt: 4 }}>Nessuna scelta ancora</Typography>
          )}
        </Box>
      </Drawer>
    </>
  );
}