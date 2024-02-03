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
    render: (text) => <a>{text}</a>,
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
  // {
  //   title: "Tags",
  //   key: "tags",
  //   dataIndex: "tags",
  //   render: (_, { tags }) => (
  //     <>
  //       {tags.map((tag) => {
  //         let color = tag.length > 5 ? "geekblue" : "green";
  //         if (tag === "loser") {
  //           color = "volcano";
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </>
  //   ),
  // },
  // {
  //   title: "Action",
  //   key: "action",
  //   render: (_, record) => (
  //     <Space size="middle">
  //       <a>Invite {record.name}</a>
  //       <a>Delete</a>
  //     </Space>
  //   ),
  // },
];

//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//     tags: ["nice", "developer"],
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//     tags: ["loser"],
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     age: 32,
//     address: "Sydney No. 1 Lake Park",
//     tags: ["cool", "teacher"],
//   },
// ];

export default function viewVehicle() {
  const [tableData, setTableData] = useState<TableProps<DataType> | any>();
  const { Title } = Typography;
  var vehicleClientAPI = new vehicleClient();

  vehicleClientAPI.getAllVehicle().then((res: any) => {
    setTableData(res);
  });

  return (
    <>
      <Navbar></Navbar>
      <Row justify={"center"}>
        <Title>List all of vehicle</Title>
      </Row>

      <Col sm={12} offset={6}>
        <Table columns={columns} dataSource={tableData} />
      </Col>
    </>
  );
}
