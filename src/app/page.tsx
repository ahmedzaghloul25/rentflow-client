'use client';

import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
  Paper,
} from '@mui/material';
import Link from 'next/link';

import logo from '@/public/logo.png'
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import ArticleIcon from '@mui/icons-material/Article';
import PaymentsIcon from '@mui/icons-material/Payments';
import Image from 'next/image';


export default function LandingPage() {
  return (
    <>
      <CssBaseline />
      <Box sx={{ bgcolor: 'background.paper', color: 'grey.800' }}>
        {/* Header */}
        <AppBar
          position="absolute"
          color="transparent"
          elevation={0}
          sx={{ py: 2 }}
        >
          <Container maxWidth="lg">
            <Toolbar disableGutters>
              <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                <Image src={logo} alt='rentFlow logo' height={150}/>
              </Box>
              <Button
                component={Link}
                href="/auth"
                variant="contained"
                sx={{
                  display: { xs: 'none', sm: 'inline-flex' },
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem',
                  px: 3,
                }}
              >
                Login / Register
              </Button>
            </Toolbar>
          </Container>
        </AppBar>

        <main>
          {/* Hero Section */}
          <Box
            sx={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pt: { xs: 15, sm: 10 },
              pb: 10,
              backgroundImage: (theme) =>
                `radial-gradient(circle at top right, ${theme.palette.primary.light}11, transparent 40%), radial-gradient(circle at bottom left, ${theme.palette.primary.light}11, transparent 50%)`,
            }}
          >
            <Container maxWidth="md" sx={{ textAlign: 'center' }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                  fontWeight: 'bold',
                  letterSpacing: '-0.025em',
                  lineHeight: 1.2,
                }}
              >
                Effortless Rental Management, All in One Place.
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mt: 3,
                  color: 'text.secondary',
                  maxWidth: '700px',
                  mx: 'auto',
                  fontWeight: 400,
                }}
              >
                From contracts to payments, RentFlow simplifies every step of
                managing your properties. Save time, stay organized, and gain
                financial clarity.
              </Typography>
              <Button
                component={Link}
                href="/auth"
                variant="contained"
                size="large"
                sx={{
                  mt: 5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  py: 1.5,
                  px: 6,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                Access Your Dashboard
              </Button>
            </Container>
          </Box>

          {/* Features Section */}
          <Box component="section" sx={{ py: 12, bgcolor: 'common.white' }}>
            <Container maxWidth="lg">
              <Box sx={{ textAlign: 'center', mb: 10 }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                  Everything You Need to Succeed
                </Typography>
                <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary', fontWeight: 400 }}>
                  Powerful features designed to make property management simpler.
                </Typography>
              </Box>
              <Grid container spacing={6} justifyContent="center">
                {[
                  {
                    icon: <HomeWorkIcon fontSize="large" />,
                    title: 'Centralized Properties',
                    description: 'Manage all your rental units, from apartments to commercial spaces, from a single, intuitive dashboard.',
                  },
                  {
                    icon: <ArticleIcon fontSize="large" />,
                    title: 'Streamlined Contracts',
                    description: 'Create, track, and manage digital rental agreements. Never miss a renewal date again.',
                  },
                  {
                    icon: <PaymentsIcon fontSize="large" />,
                    title: 'Clear Financial',
                    description: 'Track due dates, record payments, and get a clear overview of your income and outstanding balances.',
                  },
                ].map((feature, index) => (
                  <Grid size={{xs:12, md:4}} key={index} sx={{ textAlign: 'center' }}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 4,
                        bgcolor: 'background.default', // You may need to define this in your theme
                        display: 'inline-flex',
                        borderRadius: 4,
                        color: 'primary.main',
                      }}
                    >
                      {feature.icon}
                    </Paper>
                    <Typography variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 1 }}>
                      {feature.title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      {feature.description}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>

          {/* Call to Action Section */}
          <Box component="section" sx={{ py: 12 }}>
            <Container maxWidth="md" sx={{ textAlign: 'center' }}>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                Ready to Take Control of Your Rentals?
              </Typography>
              <Typography variant="h6" sx={{ mt: 2, color: 'text.secondary', fontWeight: 400, maxWidth: '750px', mx: 'auto' }}>
                Join other property managers who trust RentFlow to simplify their workflow and boost their efficiency.
              </Typography>
              <Button
                component={Link}
                href="/auth"
                variant="contained"
                size="large"
                sx={{
                  mt: 4,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  py: 1.5,
                  px: 6,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                Get Started for Free
              </Button>
            </Container>
          </Box>
        </main>

        {/* Footer */}
        <Box
          component="footer"
          sx={{ bgcolor: 'grey.900', color: 'common.white', py: 6 }}
        >
          <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
            <Typography>&copy; 2025 RentFlow. All rights reserved.</Typography>
          </Container>
        </Box>
      </Box>
    </>
  );
}

