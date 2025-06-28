import { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Login', path: '/login' },
  { label: 'Register', path: '/register' }
]

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open)
  }

  return (
    <AppBar position="sticky" elevation={1} sx={{ bgcolor: 'white', color: 'text.primary' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Brand Logo */}
          <Box component={Link} to="/" sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
            🩺MediCareBook
            </Typography>
          </Box>

          {/* Desktop Links */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.path}
                  component={Link}
                  to={link.path}
                  color="inherit"
                  sx={{ textTransform: 'none' }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Mobile Menu Icon */}
          {isMobile && (
            <>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                <Box
                  sx={{ width: 250 }}
                  role="presentation"
                  onClick={toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
                >
                  <List>
                    {navLinks.map((link) => (
                      <ListItem key={link.path} disablePadding>
                        <ListItemButton component={Link} to={link.path}>
                          <ListItemText primary={link.label} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
