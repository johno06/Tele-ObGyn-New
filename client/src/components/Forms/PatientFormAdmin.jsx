import { Button, Col, Form, Input, Row, Select, DatePicker } from "antd";
import React, { useState } from "react";
import moment from 'moment'
import {useDispatch, useSelector} from 'react-redux';
import {showLoading, hideLoading} from '../../redux/alertSlice';
import {toast} from 'react-hot-toast';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

function PatientFormAdmin({ onFinish, initialValues }) {
  const [birthdate, setDate] = useState();
  const dateFormat = "YYYY/MM/DD";
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //DATE UNDER CONSTRUCTION
    const handleDateChange = birthdate => {
    setDate(birthdate);
    };


   const onFinish1 = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/admin/update-patient-profile",
        {
          ...values,
          birthdate: (birthdate).format("YYYY-MM-DD"),
          _id: params.userId,
        //   timings: [
        //     (values.timings[0]).format("HH:00"),
        //     (values.timings[1]).format("HH:00"),
        //   ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/admin/userslist");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong:", error);
    }
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish1}
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
            selected = {birthdate}
                    style={{ width: "100%" }}
                    format="YYYY-MM-DD"
                    onChange={handleDateChange}
            //   format={dateFormat}
            //   onChange={(initialValues) => {
            //     setDate((initialValues));
            //     (birthdate).format("YYYY-MM-DD");
            //   }}
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
          Update Patient
        </Button>
      </div>
    </Form>
  );
}

export default PatientFormAdmin;
