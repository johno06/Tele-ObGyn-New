import React, { useEffect, useState } from "react";
import axios from "axios";
import Main from "../layouts/Main";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertSlice";
import { Card, Col, Row } from "antd";
import {
  ActiveDoctor,
  DataCounter,
  Doctor,
  EChart,
  Information,
  LineChart,
} from "../components";
import card from "../assets/images/doctor-card.png";

function Home() {
  const { user } = useSelector((state) => state.user);
  const [doctors, setDoctor] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/user/get-all-approved-doctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (user?.isAdmin) {
    return (
      <Main>
        <div className="layout-content">
          <Row className="rowgap-vbox" gutter={[24, 0]}>
            <DataCounter />
          </Row>
          <Row gutter={[24, 0]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
              <Card bordered={false} className="criclebox h-full">
                <EChart />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
              <Card bordered={false} className="criclebox h-full">
                <LineChart />
              </Card>
            </Col>
          </Row>
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12} sm={24} lg={12} xl={14} className="mb-24">
              <Card bordered={false} className="criclebox h-full">
                <Row gutter>
                  <Col
                    xs={24}
                    md={12}
                    sm={24}
                    lg={12}
                    xl={14}
                    className="mobile-24"
                  >
                    <ActiveDoctor />
                  </Col>
                  <Col
                    xs={24}
                    md={12}
                    sm={24}
                    lg={12}
                    xl={10}
                    className="col-img"
                  >
                    <div className="ant-cret text-right">
                      <img src={card} alt="" className="border10" />
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col xs={24} md={12} sm={24} lg={12} xl={10} className="mb-24">
              <Card bordered={false} className="criclebox card-info-2 h-full">
                <Information />
              </Card>
            </Col>
          </Row>
        </div>
      </Main>
    );
  } else {
    return (
      <Main>
        <div className="layout-content">
          <Row gutter={[24, 0]}>
            {doctors.map((doctor) => (
              <Col xs={24} md={12} sm={24} lg={12} xl={14} className="mb-24">
                <Doctor doctor={doctor} />
              </Col>
            ))}
          </Row>
        </div>
      </Main>
    );
  }
}

export default Home;
