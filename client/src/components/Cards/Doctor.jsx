import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Typography } from "antd";
import card from "../../assets/images/doctor-card.png";

function Doctor({ doctor }) {
  const navigate = useNavigate();
  const { Title, Text } = Typography;
  return (
    <>
      <Card bordered={false} className="criclebox h-full">
        <Row>
          <Col xs={24} md={12} sm={24} lg={12} xl={14} className="mobile-24">
            <div className="h-full col-content p-20">
              <div
                className="cursor-pointer ant-muse"
                onClick={() => navigate(`/book-appointment/${doctor._id}`)}
              >
                <Title level={5}>
                  Dr. {doctor.firstName} {doctor.lastName}
                </Title>
                <Text>
                  <b>Contact: </b>
                  {doctor.phoneNumber}
                </Text>
                <br />
                <Text>
                  <b>Address: </b>
                  {doctor.address}
                </Text>
                <br />
                {/* <Text>
                  <b>Consultation Fee: </b>
                  {doctor.fee}
                </Text>
                <br/> */}
                <Text>
                  <b>Consultation Hours: </b>
                  {doctor.timings[0]} - {doctor.timings[1]}
                </Text>
                <br />

                <Text type="danger">
                  <b>Every Wednesday and Friday</b>
                </Text>
              </div>
            </div>
          </Col>
          <Col xs={24} md={12} sm={24} lg={12} xl={10} className="col-img">
            <div className="ant-cret">
              <img src={card} alt="" className="" />
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default Doctor;
