import React, { useEffect, useState } from 'react';
import { Container, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { message } from 'antd';

const UserAppointments = () => {
  const [userid, setUserId] = useState();
  const [type, setType] = useState(false);
  const [userAppointments, setUserAppointments] = useState([]);
  const [doctorAppointments, setDoctorAppointments] = useState([]);

  const getUser = () => {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user) {
      const { _id, isdoctor } = user;
      setUserId(_id);
      setType(isdoctor);
    } else {
      alert('No user to show');
    }
  };

  const getUserAppointment = async () => {
    try {
      const res = await axios.get('http://localhost:8001/api/user/getuserappointments', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { userId: userid },
      });
      if (res.data.success) {
        message.success(res.data.message);
        setUserAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    }
  };

  const getDoctorAppointment = async () => {
    try {
      const res = await axios.get('http://localhost:8001/api/doctor/getdoctorappointments', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { userId: userid },
      });
      if (res.data.success) {
        message.success(res.data.message);
        setDoctorAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    }
  };

  const handleStatus = async (userid, appointmentId, status) => {
    try {
      const res = await axios.post(
        'http://localhost:8001/api/doctor/handlestatus',
        { userid, appointmentId, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getDoctorAppointment();
        getUserAppointment();
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    }
  };

  const handleDownload = async (url, appointId) => {
    try {
      const res = await axios.get('http://localhost:8001/api/doctor/getdocumentdownload', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
        params: { appointId },
        responseType: 'blob'
      });

      if (res.data) {
        const fileUrl = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
        const downloadLink = document.createElement("a");
        document.body.appendChild(downloadLink);
        downloadLink.setAttribute("href", fileUrl);
        const fileName = url.split("/").pop();
        downloadLink.setAttribute("download", fileName);
        downloadLink.style.display = "none";
        downloadLink.click();
      } else {
        message.error(res.data.error);
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (userid) {
      if (type) {
        getDoctorAppointment();
      } else {
        getUserAppointment();
      }
    }
  }, [userid, type]);

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">All Appointments</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {type ? (
          doctorAppointments.length > 0 ? (
            doctorAppointments.map((appointment) => (
              <Col key={appointment._id}>
                <Card className="shadow-sm h-100">
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{appointment.userInfo.fullName}</Card.Title>
                    <Card.Text>
                      <strong>Date:</strong> {appointment.date} <br />
                      <strong>Phone:</strong> {appointment.userInfo.phone} <br />
                      <strong>Status:</strong>{' '}
                      <span className={appointment.status === 'approved' ? 'text-success' : 'text-warning'}>
                        {appointment.status}
                      </span>
                    </Card.Text>

                    {appointment.document && (
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="mt-2"
                        onClick={() => handleDownload(appointment.document.path, appointment._id)}
                      >
                        {appointment.document.filename}
                      </Button>
                    )}
                    <br/>
                    {appointment.status !== 'approved' && (
                      <Button
                        variant="success"
                        className="mt-auto"
                        onClick={() => handleStatus(appointment.userInfo._id, appointment._id, 'approved')}
                      >
                        Approve
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <Alert variant="info">
                <Alert.Heading>No Appointments to show</Alert.Heading>
              </Alert>
            </Col>
          )
        ) : userAppointments.length > 0 ? (
          userAppointments.map((appointment) => (
            <Col key={appointment._id}>
              <Card className="shadow-sm h-100">
                <Card.Body className="d-flex flex-column">
                  <Card.Title>Dr. {appointment.docName}</Card.Title>
                  <Card.Text className="mb-4">
                    <strong>Date:</strong> {appointment.date} <br />
                    <strong>Status:</strong>{' '}
                    <span className={appointment.status === 'approved' ? 'text-success' : 'text-warning'}>
                      {appointment.status}
                    </span>
                  </Card.Text>
                  <div className="mt-auto"></div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <Alert variant="info">
              <Alert.Heading>No Appointments to show</Alert.Heading>
            </Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default UserAppointments;
