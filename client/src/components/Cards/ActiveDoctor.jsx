import { RightOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import React from "react";

export default function ActiveDoctor() {
  const { Title, Text } = Typography;
  return (
    <div className="h-full col-content p-20">
      <div className="ant-muse">
        <Text>Built by developers</Text>
        <Title level={5}>Muse Dashboard for Ant Design</Title>
        <Paragraph className="lastweek mb-36">
          From colors, cards, typography to complex elements, you will find the
          full documentation.
        </Paragraph>
      </div>
      <div className="card-footer">
        <a className="icon-move-right" href="#pablo">
          Read More
          {<RightOutlined />}
        </a>
      </div>
    </div>
  );
}
