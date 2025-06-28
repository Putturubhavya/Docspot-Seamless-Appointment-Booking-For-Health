import React, { useState, useEffect } from 'react'
import { Tabs, message, Card, Typography, Button, Divider, Empty } from 'antd'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const { TabPane } = Tabs
const { Title, Text } = Typography
const Notification = () => {
   const [user, setUser] = useState()
   const navigate = useNavigate()
   const getUser = () => {
      const userdata = JSON.parse(localStorage.getItem('userData'))
      if (userdata) {
         setUser(userdata)
      }
   }


   const handleAllMarkRead = async () => {
      try {
         const res = await axios.post('http://localhost:8001/api/user/getallnotification', { userId: user._id }, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
         })
         if (res.data.success) {
            const updatedUser = { ...user, notification: [], seennotification: [...user.seennotification, ...user.notification] };
            localStorage.setItem('userData', JSON.stringify(updatedUser));
            
            message.success(res.data.message)
            setUser({ ...user, notification: [] })
         }
         else {
            message.error(res.data.message)
         }
      } catch (error) {
         console.log(error)
         message.error("something went wrong")
      }
   }
   const  handleDeleteAllRead= async () => {
      try {
         const res = await axios.post('http://localhost:8001/api/user/deleteallnotification', { userId: user._id }, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
         })
         if (res.data.success) {
            setUser({ ...user, seennotification: [] });
            message.success(res.data.message)
         }
         else {
            message.error(res.data.message)
         }
      } catch (error) {
         console.log(error)
         message.error("something went wrong")

      }
   }
   useEffect(() => {
      getUser()
   }, []);


   return (
       <div className="container py-4">
      <Title level={3} className="text-center mb-4">
        Notifications
      </Title>

      <Tabs defaultActiveKey="0" centered>
        <TabPane tab="🔔 Unread" key="0">
          <div className="d-flex justify-content-end mb-3">
            <Button type="primary" onClick={handleAllMarkRead}>
              Mark all as read
            </Button>
          </div>

          {user?.notification.length > 0 ? (
            user.notification.map((notificationMsg, idx) => (
              <Card
                key={idx}
                hoverable
                className="mb-3 shadow-sm"
                onClick={() => navigate(notificationMsg.onClickPath)}
              >
                <Text>{notificationMsg.message}</Text>
              </Card>
            ))
          ) : (
            <Empty description="No unread notifications" />
          )}
        </TabPane>

        <TabPane tab="📄 Read" key="1">
          <div className="d-flex justify-content-end mb-3">
            <Button danger onClick={handleDeleteAllRead}>
              Delete all read
            </Button>
          </div>

          {user?.seennotification.length > 0 ? (
            user.seennotification.map((notificationMsg, idx) => (
              <Card
                key={idx}
                hoverable
                className="mb-3"
                onClick={() => navigate(notificationMsg.onClickPath)}
              >
                <Text type="secondary">{notificationMsg.message}</Text>
              </Card>
            ))
          ) : (
            <Empty description="No read notifications" />
          )}
        </TabPane>
      </Tabs>
    </div>
   )
}

export default Notification
