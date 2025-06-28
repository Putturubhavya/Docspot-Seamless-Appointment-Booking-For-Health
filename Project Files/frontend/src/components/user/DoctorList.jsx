import { message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';

const DoctorList = ({ userDoctorId, doctor, userdata }) => {
  const [dateTime, setDateTime] = useState('');
  const [documentFile, setDocumentFile] = useState(null);
  const [show, setShow] = useState(false);

  const currentDate = new Date().toISOString().slice(0, 16);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    setDateTime(event.target.value);
  };

  const handleDocumentChange = (event) => {
    setDocumentFile(event.target.files[0]);
  };

  const handleBook = async (e) => {
    e.preventDefault();
    try {
      const formattedDateTime = dateTime.replace('T', ' ');
      const formData = new FormData();
      formData.append('image', documentFile);
      formData.append('date', formattedDateTime);
      formData.append('userId', userDoctorId);
      formData.append('doctorId', doctor._id);
      formData.append('userInfo', JSON.stringify(userdata));
      formData.append('doctorInfo', JSON.stringify(doctor));

      const res = await axios.post('http://localhost:8001/api/user/getappointment', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        message.success(res.data.message);
        handleClose();
        setDateTime('');
        setDocumentFile(null);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Booking failed");
    }
  };

  return (
    <>
      <Card className="mb-4 shadow-sm" style={{ width: '100%', maxWidth: '320px', margin: 'auto' }}>
        <Card.Body>
          <Card.Title className="text-center text-primary">Dr. {doctor.fullName}</Card.Title>
          <hr />
          <Card.Text><strong>Phone:</strong> {doctor.phone}</Card.Text>
          <Card.Text><strong>Address:</strong> {doctor.address}</Card.Text>
          <Card.Text><strong>Specialization:</strong> {doctor.specialization}</Card.Text>
          <Card.Text><strong>Experience:</strong> {doctor.experience} Yrs</Card.Text>
          <Card.Text><strong>Fees:</strong> ₹{doctor.fees}</Card.Text>
          <Card.Text><strong>Timing:</strong> {doctor.timings[0]} - {doctor.timings[1]}</Card.Text>

          <div className="d-grid mt-3">
            <Button variant="outline-primary" onClick={handleShow}>
              Book Now
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Book Appointment</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleBook}>
          <Modal.Body>
            <strong className="text-primary">Doctor Details</strong>
            <p className="mb-1"><strong>Name:</strong> {doctor.fullName}</p>
            <p><strong>Specialization:</strong> {doctor.specialization}</p>
            <hr />
            <Form.Group controlId="datetime" className="mb-3">
              <Form.Label>Select Appointment Date & Time</Form.Label>
              <Form.Control
                type="datetime-local"
                min={currentDate}
                value={dateTime}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="document" className="mb-3">
              <Form.Label>Upload Relevant Document (Optional)</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleDocumentChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Confirm Booking
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default DoctorList;
