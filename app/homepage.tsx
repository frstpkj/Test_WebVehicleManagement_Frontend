"use client";

import Image from "next/image";
import Navbar from "./navbar";
import { Row, Col, Typography } from "antd";

export default function Homepage() {
  const { Title, Text } = Typography;
  return (
    <>
      <Navbar></Navbar>
      <Col span={24}>
        <Row justify={"center"}>
          <Title>Welcome to vehicle management system</Title>
        </Row>
      </Col>
      <Row justify={"center"}>
        <Col span={12} style={{ height: 500 }}>
          <div style={{ width: "100%", height: "100%" }}>
            <Image
              src={"/images/1.png"}
              fill={true}
              alt="Image"
              priority={false}
            />
          </div>
        </Col>
      </Row>
      <Col span={24}>
        <Row justify={"center"}>
          <Title level={4}>Copyright: Haupcar Co.,Ltd</Title>
        </Row>
        <Row justify={"center"}>
          <Text>Create by: Mr.Supakij Buasod</Text>
        </Row>
      </Col>
    </>
  );
}
