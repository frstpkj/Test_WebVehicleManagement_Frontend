"use client";
import Navbar from "../navbar";
import { Space, Table, Tag, Col, Typography, Row } from "antd";
import type { TableProps } from "antd";
import vehicleClient from "../api/_client/vehicle.client";
import { useState } from "react";

interface DataType {
  message: any[];
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "LicensePlate",
    dataIndex: "LicensePlate",
    key: "LicensePlate",
  },
  {
    title: "VehicleBrand",
    dataIndex: "VehicleBrand",
    key: "VehicleBrand",
  },
  {
    title: "VehicleModel",
    dataIndex: "VehicleModel",
    key: "VehicleModel",
  },
  {
    title: "Note",
    dataIndex: "Note",
    key: "Note",
  },
  {
    title: "etc",
    dataIndex: "etc",
    key: "etc",
  },
  {
    title: "etc",
    dataIndex: "etc",
    key: "etc",
  },
  {
    title: "Action",
    dataIndex: "LicensePlate",
    key: "LicensePlate",
    render: (text) => (
      <a href={`/edit/${text}`} style={{ color: "red" }}>
        Click to Edit
      </a>
    ),
  },
];

export default function viewVehicle() {
  const [tableData, setTableData] = useState<TableProps<DataType> | any>();
  const [loading, setLoading] = useState(true);
  const { Title } = Typography;
  const vehicleClientAPI = new vehicleClient();

  vehicleClientAPI.getAllVehicle().then((res: any) => {
    setTableData(res);
    setLoading(false);
  });

  return (
    <>
      <Navbar></Navbar>
      <Row justify={"center"}>
        <Title style={{ color: "blue" }}>Please select the vehicle</Title>
      </Row>

      <Col sm={12} offset={6}>
        <Table columns={columns} dataSource={tableData} loading={loading} />
      </Col>
    </>
  );
}
