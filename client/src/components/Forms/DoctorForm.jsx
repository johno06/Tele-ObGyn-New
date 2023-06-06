import { Button, Card, Col, Form, Input, Row, TimePicker } from "antd";
import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
function DoctorForm({ onFinish, initialValues }) {
  const { user } = useSelector((state) => state.user);

  const activated = user?.isDoctor;

  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card className="criclebox tablespace mb-24">
            <Form
              layout="vertical"
              onFinish={onFinish}
              style={{ padding: "20px"}}
              initialValues={{
                ...initialValues,
                ...(initialValues && {
                  timings: [
                    moment(initialValues?.timings[0], "HH:00"),
                    moment(initialValues?.timings[1], "HH:00"),
                  ],
                }),
              }}
            >
              <h1 className="card-title mt-3">Personal Information</h1>
              <Row gutter={20}>
                <Col span={8} xs={24} sm={24} lg={8}>
                  <Form.Item
                    required
                    label="First Name"
                    name="firstName"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                  <Form.Item
                    required
                    label="Last Name"
                    name="lastName"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                  <Form.Item
                    required
                    label="Phone Number"
                    name="phoneNumber"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Phone Number" />
                  </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                  <Form.Item
                    required
                    label="Address"
                    name="address"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Address" />
                  </Form.Item>
                </Col>
              </Row>
           
              <h1 className="card-title mt-3">Professional Information</h1>
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
                  <Form.Item
                    required
                    label="Experience"
                    name="experience"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Experience" type="number" />
                  </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                  <Form.Item
                    required
                    label="Timings"
                    name="timings"
                    rules={[{ required: true }]}
                  >
                    <TimePicker.RangePicker format="HH:00" />
                  </Form.Item>
                </Col>
              </Row>

              <div className="d-flex justify-content-end">
                <Button type="primary" danger htmlType="submit">
                  Update Profile
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default DoctorForm;
