import React, { useEffect, useState } from 'react'
import { Badge, Row } from 'antd'
import Notification from '../common/Notification'
import axios from 'axios'
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  AppBar,
  Toolbar,
  Avatar,
  CssBaseline,
  IconButton,
  useMediaQuery,
  useTheme,
  Paper,
  Container
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import MedicationIcon from '@mui/icons-material/Medication'
import LogoutIcon from '@mui/icons-material/Logout'
import NotificationsIcon from '@mui/icons-material/Notifications'
import DashboardIcon from '@mui/icons-material/Dashboard'

import ApplyDoctor from './ApplyDoctor'
import UserAppointments from './UserAppointments'
import DoctorList from './DoctorList'

const drawerWidth = 240

const UserHome = () => {
  const [doctors, setDoctors] = useState([])
  const [userdata, setUserData] = useState({})
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const getUserData = async () => {
    try {
      const res = await axios.post('http://localhost:8001/api/user/getuserdata', {}, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      if (res.data.success) {
        const user = res.data.data
        setUserData(user)
        setActiveMenuItem(user.isdoctor ? 'userappointments' : 'dashboard')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getDoctorData = async () => {
    try {
      const res = await axios.get('http://localhost:8001/api/user/getalldoctorsu', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      if (res.data.success) {
        setDoctors(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchAll = async () => {
      await getUserData()
      await getDoctorData()
      setLoading(false)
    }
    fetchAll()
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    window.location.href = '/'
  }

  const handleMenuItemClick = async (menuItem) => {
    setActiveMenuItem(menuItem)
    if (menuItem === 'dashboard') {
      await getDoctorData()
    }
    if (isMobile) setMobileOpen(false)
  }

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h6" fontWeight="bold">MediCareBook</Typography>
      </Toolbar>
      <List>
        {!userdata.isdoctor && (
          <ListItem disablePadding>
            <ListItemButton
              selected={activeMenuItem === 'dashboard'}
              onClick={() => handleMenuItemClick('dashboard')}
            >
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
        )}

        <ListItem disablePadding>
          <ListItemButton
            selected={activeMenuItem === 'userappointments'}
            onClick={() => handleMenuItemClick('userappointments')}
          >
            <ListItemIcon><CalendarMonthIcon /></ListItemIcon>
            <ListItemText primary="Appointments" />
          </ListItemButton>
        </ListItem>

        {!userdata.isdoctor && (
          <ListItem disablePadding>
            <ListItemButton
              selected={activeMenuItem === 'applyDoctor'}
              onClick={() => handleMenuItemClick('applyDoctor')}
            >
              <ListItemIcon><MedicationIcon /></ListItemIcon>
              <ListItemText primary="Apply as Doctor" />
            </ListItemButton>
          </ListItem>
        )}

        <ListItem disablePadding>
          <ListItemButton onClick={logout}>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6" color="primary">Loading...</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: '#1976d2'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box display="flex" alignItems="center" gap={2}>
            <Badge
              count={userdata?.notification?.length || 0}
              onClick={() => handleMenuItemClick('notification')}
              style={{ cursor: 'pointer' }}
            >
              <NotificationsIcon sx={{ color: '#fff' }} />
            </Badge>
            <Typography variant="h6" color="inherit">
              {userdata?.isdoctor && 'Dr. '} {userdata?.fullName}
            </Typography>
          </Box>
          <Avatar>{userdata?.fullName?.charAt(0)}</Avatar>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={() => setMobileOpen(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#f5f5f5'
          }
        }}
      >
        {drawer}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
          minHeight: '100vh',
          bgcolor: '#f0f2f5'
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, md: 4 },
            borderRadius: 3,
            backgroundColor: '#ffffff',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)'
          }}
        >
          {activeMenuItem === 'applyDoctor' && <ApplyDoctor userId={userdata._id} />}
          {activeMenuItem === 'notification' && <Notification />}
          {activeMenuItem === 'userappointments' && <UserAppointments />}

          {activeMenuItem === 'dashboard' && !userdata.isdoctor && (
            <Container maxWidth="lg">
              <Typography
                variant="h5"
                align="center"
                sx={{ pb: 3, fontWeight: 600, color: '#1976d2' }}
              >
                Dashboard
              </Typography>

              {doctors.length > 0 ? (
                <Row gutter={[16, 16]}>
                  {doctors.map((doctor, i) => (
                    <DoctorList
                      userDoctorId={doctor.userId}
                      doctor={doctor}
                      userdata={userdata}
                      key={i}
                    />
                  ))}
                </Row>
              ) : (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  sx={{ mt: 4, mb: 2 }}
                >
                  <img
                    src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-2684725-2236425.png"
                    alt="No Doctors"
                    style={{ width: '200px', marginBottom: '20px' }}
                  />
                  <Typography variant="body1" color="text.secondary">
                    No doctors available at the moment. Please check back later.
                  </Typography>
                </Box>
              )}
            </Container>
          )}
        </Paper>
      </Box>
    </Box>
  )
}

export default UserHome
