import { Link } from 'react-router-dom'
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Avatar
} from '@mui/material'
import {
  Search,
  Schedule,
  Verified,
  LocalHospital,
  AccessTime,
  People
} from '@mui/icons-material'

const Landing = () => {
  const features = [
    {
      icon: <Search />,
      title: 'Find Doctors',
      description: 'Search and filter through hundreds of qualified healthcare professionals'
    },
    {
      icon: <Schedule />,
      title: 'Book Instantly',
      description: 'Schedule appointments in real-time with available doctors'
    },
    {
      icon: <Verified />,
      title: 'Verified Professionals',
      description: 'All doctors are verified and licensed healthcare providers'
    }
  ]

  const steps = [
    {
      number: '1',
      title: 'Create Account',
      description: 'Sign up as a patient and complete your profile'
    },
    {
      number: '2',
      title: 'Find a Doctor',
      description: 'Browse doctors by specialty, location, and availability'
    },
    {
      number: '3',
      title: 'Book Appointment',
      description: 'Schedule your appointment and get confirmation instantly'
    }
  ]

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #2196F3 0%, #00BCD4 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              mb: 3
            }}
          >
            Book a Doctor Appointment Today
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              opacity: 0.9,
              fontWeight: 300,
              fontSize: { xs: '1.2rem', md: '1.5rem' }
            }}
          >
            Find qualified healthcare professionals and schedule appointments 
            with ease. Your health is our priority.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': {
                  bgcolor: 'grey.100'
                }
              }}
            >
              Get Started
            </Button>
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Sign In
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 600 }}
        >
          Why Choose DocSpot?
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 3,
                  border: '1px solid',
                  borderColor: 'grey.200',
                  '&:hover': {
                    boxShadow: 4,
                    transform: 'translateY(-4px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: 'primary.main',
                    width: 64,
                    height: 64,
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  {feature.icon}
                </Avatar>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            gutterBottom
            sx={{ mb: 6, fontWeight: 600 }}
          >
            How It Works
          </Typography>
          
          <Grid container spacing={4}>
            {steps.map((step, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: 'secondary.main',
                      width: 56,
                      height: 56,
                      mb: 2,
                      fontSize: '1.5rem',
                      fontWeight: 700
                    }}
                  >
                    {step.number}
                  </Avatar>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {step.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} textAlign="center">
          <Grid item xs={12} md={4}>
            <Box>
              <Avatar
                sx={{
                  bgcolor: 'success.main',
                  width: 64,
                  height: 64,
                  mx: 'auto',
                  mb: 2
                }}
              >
                <LocalHospital />
              </Avatar>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main' }}>
                500+
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Verified Doctors
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <Avatar
                sx={{
                  bgcolor: 'warning.main',
                  width: 64,
                  height: 64,
                  mx: 'auto',
                  mb: 2
                }}
              >
                <People />
              </Avatar>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main' }}>
                10,000+
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Happy Patients
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <Avatar
                sx={{
                  bgcolor: 'error.main',
                  width: 64,
                  height: 64,
                  mx: 'auto',
                  mb: 2
                }}
              >
                <AccessTime />
              </Avatar>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main' }}>
                24/7
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Available Support
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }}>
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of patients who trust DocSpot for their healthcare needs
          </Typography>
          <Button
            component={Link}
            to="/register"
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              '&:hover': {
                bgcolor: 'grey.100'
              }
            }}
          >
            Create Account Now
          </Button>
        </Container>
      </Box>
    </Box>
  )
}

export default Landing