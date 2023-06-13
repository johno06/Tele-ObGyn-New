import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  TimePicker,
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
  DatePicker
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertSlice";
import { useNavigate, useParams } from "react-router-dom";
import { PatientForm } from "../../components";
import Main from "../../layouts/Main";
import BgProfile from "../../assets/images/pinkBg.jpg";
import profilavatar from "../../assets/images/face-1.jpg";
import { PlusOutlined } from "@ant-design/icons";
import moment from 'moment';


function Profile() {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [patient, setPatient] = useState(null);
  const [recordApp, setRecordApp] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let data = [];

  const [visible, setVisible] = useState(false);
  const [visibleAdd, setVisibleAdd] = useState (false);

  const [form] = Form.useForm();
  const [index, setIndex] = useState (null);

  const handleUpdate = (record) => {
    // Set the form values with the record data
    form.setFieldsValue(record);
    // Show the modal
    setVisible(true);
     const recindex = patient?.phr.findIndex((item) => item === record);
     setIndex(recindex);
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
    // {
    //   id: 1,
    //   name: "John Doe",
    //   age: 25,
    // },
    // {
    //   id: 2,
    //   name: "Jane Smith",
    //   age: 30,
    // },
    // Add more data here...
  ];

const [appointmentDate, setAppointmentDate] = useState();
const dateFormat = "YYYY-MM-DD";
const [lastMenstrualDate, setLastMenstrualDate] = useState (null);
const [ageOfGestation, setAgeOfGestation] = useState ('');
const [estimatedDueDate, setEstimatedDueDate] = useState ('');
const [appointmentTime, setAppointmentTime] = useState ('');
const [chiefOfComp, setChiefOfComp] = useState ('');
const [diagnosis, setDiagnosis] = useState ('');


const handleDateChange = date => {
  setLastMenstrualDate (date);

  if (date) {
    const currentDate = new Date ();
    const selectedDateObj = new Date (date);

    const timeDiff = currentDate.getTime () - selectedDateObj.getTime ();
    const daysPassed = Math.ceil (timeDiff / (1000 * 3600 * 24));

    const weeksPassed = Math.floor (daysPassed / 7);
    const daysRemaining = daysPassed % 7;

    const dueDate = new Date (selectedDateObj.getTime ());
    dueDate.setDate (dueDate.getDate () + 280); // Assuming pregnancy duration of 280 days

    setAgeOfGestation (`${weeksPassed} weeks and ${daysRemaining} days`);
    setEstimatedDueDate (dueDate.toDateString ());
  } else {
    setAgeOfGestation ('');
    setEstimatedDueDate ('');
  }
};



const onUpdateRecord = async (values) => {
  const formattedDate = values['appointmentDate'] ? values['appointmentDate'].format('YYYY-MM-DD') : '';
  const formattedTime = values['appointmentTime'] ? values['appointmentTime'][0].format('HH:00') : '';
  const formattedTime1 = values['appointmentTime'] ? values['appointmentTime'][1].format('HH:00') : '';
  const appTime = formattedTime +" - "+ formattedTime1;
  const elementId = 'element_id';
  const indexData = [
  values['cop'] || '',
  values['diagnosis'] || '',
  formattedDate || '',
  appTime || '',
  ageOfGestation,
  estimatedDueDate,
];


  try {
    dispatch (showLoading ());
    const response = await axios.patch (
      'https://fuentes-clinic.onrender.com/api/doctor/update-user-record',
      {
        _id: params.userId,
      phr: {
        index,
        indexData
      },
      elementId
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem ('token')}`,
        },
      }
    );
    dispatch (hideLoading ());
    if (response.data.success) {
      toast.success (response.data.message);
      navigate ('/user/profile/'+params.userId);
    } else {
      toast.error (response.data.message);
    }
  } catch (error) {
    dispatch (hideLoading ());
    toast.error ('Something went wrong:', error);
  }
};


const onAddRecord = async values => {
  const formattedDate = values['2'] ? values['2'].format('YYYY-MM-DD') : '';
  const formattedTime = values['3'][0] ? values['3'][0].format('HH:00') : '';
  const formattedTime1 = values['3'][1] ? values['3'][1].format('HH:00') : '';
  const appTime = formattedTime +" - "+ formattedTime1;
  console.log(formattedTime);
  try {
    dispatch (showLoading ());
    const response = await axios.post (
      'https://fuentes-clinic.onrender.com/api/doctor/add-user-record',
      {
        _id: params.userId,
        phr: [
          values['0'],
          values['1'],
          formattedDate,
          appTime,
          ageOfGestation,
          estimatedDueDate]
        ,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem ('token')}`,
        },
      }
    );
    dispatch (hideLoading ());
    if (response.data.success) {
      toast.success (response.data.message);
      navigate ('/user/profile/'+params.userId);
    } else {
      toast.error (response.data.message);
    }
  } catch (error) {
    dispatch (hideLoading ());
    toast.error ('Something went wrong:', error);
  }
};

  

  //column name ng appointment records
  const columns = [
    {
      title: "Date",
      dataIndex: 2,
      key: "name",
      // width: "20%",
    },
    {
      title: "Time",
      dataIndex: 3,
      key: "function",
    },

    {
      title: "Chief of Complaint",
      key: "employed",
      dataIndex: 0,
    },
    {
      title: "Diagnosis",
      key: "employed",
      dataIndex: 1,
    },
    {
      title: "Age of Gestation (For Pregnant)",
      key: "employed",
      dataIndex: 4,
    },
    {
      title: "Estimated Due Date (For Pregnant)",
      key: "employed",
      dataIndex: 5,
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
    // form.setFieldsValue();
    setVisibleAdd(true);
  };

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "https://fuentes-clinic.onrender.com/api/user/update-patient-profile",
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
        "https://fuentes-clinic.onrender.com/api/user/get-patient-info-by-user-id",
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
        console.log(patient?.phr)
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
      {patient?.verified === true && patient?.isDoctor === false && patient?.isAdmin === false &&(
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
                  dataSource={patient?.phr}
                  pagination={false}
                  className="ant-border-space"
                />
                {/* Ito naman yung modal codes sa add */}
                <Modal
                  title="Add Record"
                  open={visibleAdd}
                  onOk={handleModalOk}
                  onCancel={handleModalCancel}
                  footer={[
                    <Button key="back" onClick={handleModalCancel}>
                      Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleModalOk}>
                      Submit
                    </Button>
                  ]}
                >
                  <Form form={form}
                   onFinish={onAddRecord}
                   >
                    <Form.Item
                    required
                    label="Date of Appointment"
                    name="2"
                    rules={[{ required: true }]}
                  >
                    <DatePicker
                      format={dateFormat}
                      onChange={(initialValues) => {
                        setAppointmentDate(moment(initialValues));
                      }}
                    />
                    </Form.Item>

        
                    <Form.Item
                    required
                    label="Time"
                    name="3"
                    rules={[{ required: true }]}
                  >
                    <TimePicker.RangePicker format="HH:00" />
                  </Form.Item>

                    <Form.Item
                      name="0"
                      label="Chief of Complaint"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="1"
                      label="Diagnosis"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    <h5>
                    For Pregnant: 
                    </h5>
                    
                  <Form.Item label="Last Menstrual Date">
                    <DatePicker
                      id="lastMenstrualDate"
                      selected={lastMenstrualDate}
                      onChange={handleDateChange}
                      dateFormat="YYYY-MM-DD"
                    />
                  </Form.Item>

                    {/* <input
                      type="date"
                      id="lastMenstrualDate"
                      value={lastMenstrualDate}
                      onChange={handleDateChange}
                    /> */}
                    
                    {ageOfGestation &&(
                      <div>
                       <Form.Item label="Age of Gestation">
                      <Input value={ageOfGestation} disabled />
                    </Form.Item>

                    <Form.Item label="Estimated Due Date">
                      <Input value={estimatedDueDate} disabled />
                    </Form.Item>
                  </div>

                    )}
                    
                  </Form>
                </Modal>
                <Modal
                  title="Update Record"
                  open={visible}
                  onOk={handleModalOk}
                  onCancel={handleModalCancel}
                  // initialValue = {patient?.phr[0]}
                >
                  <Form form={form}
                   onFinish={onUpdateRecord}
                   >
                    <Form.Item
                    required
                    label="Date of Appointment"
                    name="appointmentDate"
                    rules={[{ required: true }]}
                  >
                    <DatePicker
                      format={dateFormat}
                      onChange={(initialValues) => {
                        setAppointmentDate(moment(initialValues));
                      }}
                    />
                    </Form.Item>

        
                    <Form.Item
                    required
                    label="Time"
                    name="appointmentTime"
                    rules={[{ required: true }]}
                  >
                    <TimePicker.RangePicker format="HH:00" />
                  </Form.Item>

                    <Form.Item
                      name="cop"
                      label="Chief of Complaint"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      name="diagnosis"
                      label="Diagnosis"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    <h5>
                    For Pregnant: 
                    </h5>
                    
                  <Form.Item label="Last Menstrual Date">
                    <DatePicker
                      id="lastMenstrualDate"
                      selected={lastMenstrualDate}
                      onChange={handleDateChange}
                      dateFormat="YYYY-MM-DD"
                    />
                  </Form.Item>

                    {/* <input
                      type="date"
                      id="lastMenstrualDate"
                      value={lastMenstrualDate}
                      onChange={handleDateChange}
                    /> */}
                    
                    {ageOfGestation &&(
                      <div>
                       <Form.Item label="Age of Gestation">
                      <Input value={ageOfGestation} disabled />
                    </Form.Item>

                    <Form.Item label="Estimated Due Date">
                      <Input value={estimatedDueDate} disabled />
                    </Form.Item>
                  </div>

                    )}
                    
                  </Form>
                </Modal>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
 
      )}
         </Main>
  );
}

export default Profile;
