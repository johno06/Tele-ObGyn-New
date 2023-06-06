import { Col, Form, Input, Row, DatePicker, Card, Button } from "antd";
import React, { useState } from "react";

import moment from "moment";

function PatientForm({ onFinish, initialValues }) {
  const [birthdate, setDate] = useState();
  const dateFormat = "DD/MM/YYYY";

   

  //DATE UNDER CONSTRUCTION

  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card className="criclebox tablespace mb-24">
            <Form
              layout="vertical"
              style={{ padding: "20px"}}
              onFinish={onFinish}
              initialValues={{
                ...initialValues,
                ...(initialValues && {
                  birthdate: moment(initialValues?.birthdate),
                }),
              }}
            >
              <h1 className="card-title">Personal Information</h1>
              <Row gutter={20}>
                <Col span={8} xs={24} sm={24} lg={8}>
                  <Form.Item
                    required
                    label="First Name"
                    name="name"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                  <Form.Item
                    required
                    label="Last Name"
                    name="surname"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>
                </Col>
                <Col span={8} xs={24} sm={24} lg={8}>
                  <Form.Item
                    required
                    label="Phone Number"
                    name="phone"
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
                <Col span={8} xs={24} sm={24} lg={8}>
                  <Form.Item
                    required
                    label="Date of Birth"
                    name="birthdate"
                    rules={[{ required: true }]}
                  >
                    <DatePicker
                      format={dateFormat}
                      onChange={(initialValues) => {
                        setDate(moment(initialValues));
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
    
  );
}

export default PatientForm;
