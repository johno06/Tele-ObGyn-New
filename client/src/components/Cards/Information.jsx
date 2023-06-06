import { Typography } from "antd";
import { RightOutlined } from "@ant-design/icons";
import React from "react";

export default function Information() {
  const { Title } = Typography;
  return (
    <div className="gradent h-full col-content">
      <div className="card-content">
        <Title level={5}>What is an ObGyn?</Title>
        <p>
          An obstetrician-gynecologist, or OB-GYN, is a healthcare professional
          that specializes in female reproductive health.
        </p>
      </div>
      <div className="card-footer">
        <a
          className="icon-move-right"
          href="https://www.medicalnewstoday.com/articles/324292"
        >
          Read More
          <RightOutlined />
        </a>
      </div>
    </div>
  );
}
