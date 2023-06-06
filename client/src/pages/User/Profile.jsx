import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  Row,
  Col,
  Card,
  Avatar,
  Table,
  Radio,
  Button,
  Form,
  Input,
  Modal,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertSlice";
import { useNavigate, useParams } from "react-router-dom";
import { PatientForm } from "../../components";
import Main from "../../layouts/Main";
import BgProfile from "../../assets/images/pinkBg.jpg";
import profilavatar from "../../assets/images/face-1.jpg";
import { PlusOutlined } from "@ant-design/icons";

function Profile() {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [patient, setPatient] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let data = [];

  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const handleUpdate = (record) => {
    // Set the form values with the record data
    form.setFieldsValue(record);
    // Show the modal
    setVisible(true);
  };

  const handleModalOk = () => {
    // Handle the form submission here
    form.submit();
  };

  const handleModalCancel = () => {
    // Hide the modal
    setVisible(false);
  };

  const handleFormSubmit = (values) => {
    // Handle the form submission here
    console.log("Updated values:", values);
    // Hide the modal
    setVisible(false);
  };

  //para lang makita action
  const dataSource = [
    {
      id: 1,
      name: "John Doe",
      age: 25,
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 30,
    },
    // Add more data here...
  ];

  //column name ng appointment records
  const columns = [
    {
      title: "AUTHOR",
      dataIndex: "name",
      key: "name",
      width: "32%",
    },
    {
      title: "FUNCTION",
      dataIndex: "function",
      key: "function",
    },

    {
      title: "STATUS",
      key: "status",
      dataIndex: "status",
    },
    {
      title: "EMPLOYED",
      key: "employed",
      dataIndex: "employed",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button type="primary" onClick={() => handleUpdate(record)}>
          Update
        </Button>
      ),
    },
  ];

  //Ito yung codes kung paano lumabas modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddRecord = () => {
    setVisible(true);
  };

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/update-patient-profile",
        {
          //under construction
          ...values,
          userId: user._id,
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
        navigate("/user/profile/:userId");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong:", error);
    }
  };
  const getPatientData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/get-patient-info-by-user-id",
        {
          userId: params.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());

      if (response.data.success) {
        setPatient(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getPatientData();
  }, []);

  const role = patient?.isAdmin
    ? "Nurse"
    : patient?.isDoctor
    ? "Doctor"
    : "Patient";
  const FN = patient?.name;
  const LN = patient?.surname;
  return (
    <Main>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      />
      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar size={74} shape="square" src={profilavatar} />

                <div className="avatar-info">
                  <h4 className="font-semibold m-0">
                    {FN} {LN}
                  </h4>
                  <p>{role}</p>
                </div>
              </Avatar.Group>
            </Col>
          </Row>
        }
      />
      {/* if patient is not null, then render the form */}
      {patient && <PatientForm onFinish={onFinish} initialValues={patient} />}
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Appointment Records"
              extra={
                <>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    style={{
                      marginBottom: "16px",
                      float: "right",
                      marginTop: "16px",
                    }}
                    onClick={handleAddRecord}
                  >
                    Add Record
                  </Button>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={dataSource}
                  pagination={false}
                  className="ant-border-space"
                />
                {/* Ito naman yung modal codes sa add */}
                <Modal
                  title="Add Record"
                  open={visible}
                  onOk={handleModalOk}
                  onCancel={handleModalCancel}
                  footer={[
                    <Button key="back" onClick={handleModalCancel}>
                      Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleModalOk}>
                      Submit
                    </Button>,
                  ]}
                >
                  <Form>
                    <Form.Item label="Field 1">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Field 2">
                      <Input />
                    </Form.Item>
                    {/* Add more form fields as needed */}
                  </Form>
                </Modal>
                <Modal
                  title="Update Record"
                  open={visible}
                  onOk={handleModalOk}
                  onCancel={handleModalCancel}
                >
                  <Form form={form} onFinish={handleFormSubmit}>
                    <Form.Item
                      name="name"
                      label="Name"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="age"
                      label="Age"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </Form>
                </Modal>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </Main>
  );
}

export default Profile;
