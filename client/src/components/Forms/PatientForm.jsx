import { Button, Col, Form, Input, Row, Select, DatePicker } from "antd";
import React, { useState } from "react";
import moment from "moment";

function PatientForm({ onFinish, initialValues }) {
  const [birthdate, setDate] = useState();
  const dateFormat = "DD/MM/YYYY";

  //DATE UNDER CONSTRUCTION

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        ...initialValues,
        ...(initialValues && {
          birthdate: moment(initialValues?.birthdate),
        }),
      }}
    >
      <h1 className="card-title mt-3">Personal Information</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item required label="First Name" name="name" rules={[{ required: true }]}>
            <Input placeholder="First Name" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item required label="Last Name" name="surname" rules={[{ required: true }]}>
            <Input placeholder="Last Name" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item required label="Phone Number" name="phone" rules={[{ required: true }]}>
            <Input placeholder="Phone Number" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item required label="Address" name="address" rules={[{ required: true }]}>
            <Input placeholder="Address" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item required label="Date of Birth" name="birthdate" rules={[{ required: true }]}>
            <DatePicker
              format={dateFormat}
              onChange={(initialValues) => {
                setDate(moment(initialValues));
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <hr />
      {/* <h1 className="card-title mt-3">Professional Information</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Specialization"
            name="specialization"
            rules={[{ required: true }]}
          >
            <Input placeholder="Specialization" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item required label="Experience" name="experience" rules={[{ required: true }]}>
            <Input placeholder="Experience" type="number" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item required label="Fee Per Cunsultation" name="fee" rules={[{ required: true }]}>
            <Input placeholder="Fee Per Consultation" type="number" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item required label="Timings" name="timings" rules={[{ required: true }]}>
            <TimePicker.RangePicker format="HH:00" />
          </Form.Item>
        </Col>
      </Row> */}

      <div className="d-flex justify-content-end">
        <Button className="primary-button" htmlType="submit">
          SUBMIT
        </Button>
      </div>
    </Form>
  );
}

export default PatientForm;
