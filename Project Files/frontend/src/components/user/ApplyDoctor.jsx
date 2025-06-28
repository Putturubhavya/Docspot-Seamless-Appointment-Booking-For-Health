import { Col, Form, Input, Row, TimePicker, message } from 'antd';
import { Container } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios';

function ApplyDoctor({ userId }) {
  const [doctor, setDoctor] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    specialization: '',
    experience: '',
    fees: '',
    timings: '',
  });

  const handleTimingChange = (_, timings) => {
    setDoctor({ ...doctor, timings });
  };

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        'http://localhost:8001/api/user/registerdoc',
        { doctor, userId: userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    }
  };

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Apply as a Doctor</h2>
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        className="p-3 shadow-sm bg-white rounded"
      >
        <h5 className="mb-3 text-primary">Personal Details</h5>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Full Name" required>
              <Input
                name="fullName"
                value={doctor.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Phone Number" required>
              <Input
                name="phone"
                value={doctor.phone}
                type="tel"
                placeholder="Enter phone number"
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Email" required>
              <Input
                name="email"
                value={doctor.email}
                type="email"
                placeholder="Enter email"
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Address" required>
              <Input
                name="address"
                value={doctor.address}
                placeholder="Enter address"
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
        </Row>

        <h5 className="mt-4 mb-3 text-success">Professional Details</h5>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Specialization" required>
              <Input
                name="specialization"
                value={doctor.specialization}
                placeholder="E.g., Cardiologist"
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Experience (in years)" required>
              <Input
                name="experience"
                value={doctor.experience}
                type="number"
                placeholder="Years of experience"
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Consultation Fees (₹)" required>
              <Input
                name="fees"
                value={doctor.fees}
                type="number"
                placeholder="E.g., 500"
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Available Timings" required>
              <TimePicker.RangePicker
                format="HH:mm"
                onChange={handleTimingChange}
                className="w-100"
              />
            </Form.Item>
          </Col>
        </Row>

        <div className="d-flex justify-content-end mt-4">
          <button className="btn btn-primary px-4" type="submit">
            Submit
          </button>
        </div>
      </Form>
    </Container>
  );
}

export default ApplyDoctor;
