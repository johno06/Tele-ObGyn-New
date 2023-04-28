import { Typography } from "antd";
import { RightOutlined } from "@ant-design/icons";
import React from "react";

export default function Information() {
  const { Title } = Typography;
  return (
    <div className="gradent h-full col-content">
      <div className="card-content">
        <Title level={5}>Work with the best</Title>
        <p>
          Wealth creation is an evolutionarily recent positive-sum game. It is
          all about who take the opportunity first.
        </p>
      </div>
      <div className="card-footer">
        <a className="icon-move-right" href="#pablo">
          Read More
          <RightOutlined />
        </a>
      </div>
    </div>
  );
}
