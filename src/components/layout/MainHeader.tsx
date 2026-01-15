'use client';

import React, { useState, useEffect, MouseEvent, KeyboardEvent } from 'react';
import {
    AppBar,
    Toolbar,
    Button,
    Box,
    Container,
    Drawer,
    IconButton,
    useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import Image from 'next/image';

type PageLink = {
    label: string;
    href: string;
    target?: string;
};

const pages: PageLink[] = [
    { label: 'Drink List', href: '/drinklist' },
    { label: 'About', href: '#about' },
    { label: 'Teddy', href: '#teddy' },
    {
        label: 'Dove siamo',
        href: 'https://www.google.com/maps/dir//Via+Crocifisso,+10,+70054+Giovinazzo+BA/',
        target: '_blank',
    },
];

export default function MainHeader() {
    const [scrolled, setScrolled] = useState<boolean>(false);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        const handleScroll = (): void => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleDrawer =
        (open: boolean) =>
            (event: MouseEvent | KeyboardEvent): void => {
                if (
                    event.type === 'keydown' &&
                    'key' in event &&
                    (event.key === 'Tab' || event.key === 'Shift')
                ) {
                    return;
                }
                setDrawerOpen(open);
            };

    const drawerContent = (
        <Box
            sx={{
                minWidth: '100vw',
                minHeight: '100vh',
                backgroundColor: '#ff5700',
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <Container
                sx={{
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 2,
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                    <IconButton onClick={toggleDrawer(false)} sx={{ color: '#fff' }}>
                        <CloseIcon sx={{ fontSize: 50 }} />
                    </IconButton>
                </Box>

                {pages.map((page) => (
                    <Button
                        key={page.label}
                        component="a"
                        href={page.href}
                        target={page.target}
                        sx={{ color: '#fff' }}
                        className="menu-link-title"
                    >
                        {page.label}
                    </Button>
                ))}

                <Button
                    component="a"
                    href="tel:+393292115340"
                    sx={{ color: '#fff' }}
                    className="menu-link-title"
                >
                    Prenota
                </Button>
            </Container>
        </Box>
    );

    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: scrolled ? '#111125' : 'transparent',
                boxShadow: scrolled ? 2 : 'none',
                transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
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
                        {/* Logo */}
                        <Link href="/">
                            <Image
                                src="/logo.webp"
                                alt="Librati Cocktail Bar"
                                width={120}
                                height={59} // 5680:2798 ≈ 2.03
                                priority
                            />
                        </Link>

                        {/* Desktop menu */}
                        {!isMobile && (
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                {pages.map((page) => (
                                    <Button
                                        key={page.label}
                                        component="a"
                                        href={page.href}
                                        target={page.target}
                                        sx={{ color: '#fff', fontSize: 18 }}
                                    >
                                        {page.label}
                                    </Button>
                                ))}

                                <Button component="a" href="tel:+393292115340" className="menu-button">
                                    Prenota
                                </Button>
                            </Box>
                        )}

                        {/* Mobile */}
                        {isMobile && (
                            <>
                                <IconButton onClick={toggleDrawer(true)} sx={{ color: '#fff' }}>
                                    <DragHandleIcon sx={{ fontSize: 32 }} />
                                </IconButton>

                                <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                                    {drawerContent}
                                </Drawer>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}