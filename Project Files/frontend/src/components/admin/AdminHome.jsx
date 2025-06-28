import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
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
  Paper,
  CssBaseline,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import MedicationIcon from '@mui/icons-material/Medication'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MenuIcon from '@mui/icons-material/Menu'
import { Badge } from 'antd'

import Notification from '../common/Notification'
import AdminUsers from './AdminUsers'
import AdminDoctors from './AdminDoctors'
import AdminAppointments from './AdminAppointments'

const drawerWidth = 240

const AdminHome = () => {
  const [userdata, setUserData] = useState({})
  const [activeMenuItem, setActiveMenuItem] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const getUserData = async () => {
    try {
      await axios.post('http://localhost:8001/api/user/getuserdata', {}, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  const getUser = () => {
    const user = JSON.parse(localStorage.getItem('userData'))
    if (user) {
      setUserData(user)
    }
  }

  useEffect(() => {
    getUserData()
    getUser()
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    window.location.href = '/'
  }

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem)
    if (isMobile) {
      setMobileOpen(false)
    }
  }

  const menuItems = [
    { key: 'adminusers', icon: <CalendarMonthIcon />, label: 'Users' },
    { key: 'admindoctors', icon: <MedicationIcon />, label: 'Doctors' },
    { key: 'logout', icon: <LogoutIcon />, label: 'Logout', action: logout }
  ]

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h6" fontWeight="bold">MediCareBook</Typography>
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.key} disablePadding>
            <ListItemButton
              selected={activeMenuItem === item.key}
              onClick={() =>
                item.action ? item.action() : handleMenuItemClick(item.key)
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: '#1976d2'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Mobile Menu Icon */}
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
              Welcome, {userdata?.fullName}
            </Typography>
          </Box>

          <Avatar>{userdata?.fullName?.charAt(0)}</Avatar>
        </Toolbar>
      </AppBar>

      {/* Drawer for Desktop */}
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

      {/* Main Content */}
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
        <Paper elevation={2} sx={{ p: { xs: 2, md: 4 } }}>
          {activeMenuItem === 'notification' && <Notification />}
          {activeMenuItem === 'adminusers' && <AdminUsers />}
          {activeMenuItem === 'admindoctors' && <AdminDoctors />}
          {!['notification', 'adminusers', 'admindoctors'].includes(activeMenuItem) && <AdminAppointments />}
        </Paper>
      </Box>
    </Box>
  )
}

export default AdminHome
