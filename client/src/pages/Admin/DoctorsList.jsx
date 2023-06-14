import React, { useEffect, useState } from "react";
import { hideLoading, showLoading } from "../../redux/alertSlice";
import axios from "axios";
import { toast } from "react-hot-toast";
import Main from "../../layouts/Main";
import moment from 'moment'
import {useDispatch, useSelector} from 'react-redux';
import {Avatar, Card, Col, Row, Space, Table, Typography} from 'antd';
import face from '../../assets/images/avatar-1.png';
import {NavLink} from 'react-router-dom';

function DoctorsList() {
  const [users, setUsers] = useState([]);
  var { user } = useSelector((state) => state.user);
  const { Title } = Typography;
  const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";
  const dispatch = useDispatch();
  var idList =[];
  const getUserData = async () => {
    try {
      dispatch(showLoading());
      await axios
        .get("https://fuentes-clinic.onrender.com/api/user/get-all-doctor", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          dispatch(hideLoading());
          setUsers(
            res.data.data.map((row, index) => ({
              key: index,
              firstName: (
                <>
                  <Avatar.Group>
                    <Avatar
                      className="shape-avatar"
                      shape="square"
                      size={40}
                      src={face}
                    ></Avatar>
                    <div className="avatar-info">
                      <Title level={5}>{row.name}</Title>
                      <p>{row?.isAdmin ? "Admin" : row?.isDoctor ? "Doctor" : "User"}</p>
                    </div>
                  </Avatar.Group>
                </>
              ),
              email: row.email,
              CreatedAt: moment(row.createdAt).format("DD/MM/YYYY"),
              actions: (
                <Space className="ant-employed" size="middle">
                  <NavLink to={`/user/profile/${row._id}`}>
                    <p>View Profile</p>
                  </NavLink>
                  {/* <a>Delete</a> */}
                </Space>
              ),
            })),
          );
        });
      // dispatch(hideLoading());
      // if (response.data.success) {
      //   setUsers(response.data.data);
      // }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const columns = [
    {
      title: "NAME",
      dataIndex: "firstName",
      width: "32%",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
    },
    {
      title: "DATE CREATED",
      dataIndex: "createdAt",
      render: (text, record) => moment(record.createdAt).format("DD/MM/YYYY"),
    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
      
    },
  ];

  return (
    <Main>
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title="List of Doctors"
          >
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={users}
                className="ant-border-space"
              />
            </div>
          </Card>
        </Col>
      </Row>
    </Main>
  );
}
export default DoctorsList;
