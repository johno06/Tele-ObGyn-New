import React, { useEffect, useState } from "react";
import { hideLoading, showLoading } from "../../redux/alertSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Table } from "antd";
import Main from "../../layouts/Main";
import moment from 'moment';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("https://fuentes-clinic.onrender.com/api/user/get-appointments-by-user-id", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setAppointments(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getAppointmentsData();
  }, []);

  const columns = [
    {
      title: "Doctor",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.doctorInfo.firstName} {record.doctorInfo.lastName}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      render: (text, record) => (
        <span>
          {record.doctorInfo.phoneNumber} 
        </span>
      ),
    },
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD/MM/YYYY")} {moment(record.time).format("HH:00")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    }
  ];

  return (
    <Main>
      <h1 className="page-title">Appointments</h1>
      <hr/>
      <Table columns={columns} dataSource={appointments} />
    </Main>
  );
}

export default Appointments;
