"use client";
import Navbar from "../navbar";
import React from "react";
import {
  CarOutlined,
  IdcardOutlined,
  SnippetsOutlined,
  InfoCircleOutlined,
  QuestionOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { Input, Col, Row, Typography, Button } from "antd";
import vehicleClient from "../api/_client/vehicle.client";

function clickAddVehicle() {
  const vehicleClientAPI = new vehicleClient();
  var license = (document.getElementById("licensePlate") as HTMLInputElement)
    .value;
  var brand = (document.getElementById("vehicleBrand") as HTMLInputElement)
    .value;
  var model = (document.getElementById("vehicleModel") as HTMLInputElement)
    .value;
  var note = (document.getElementById("note") as HTMLInputElement).value;
  var etc = (document.getElementById("etc") as HTMLInputElement).value;
  if (
    license !== "" &&
    brand !== "" &&
    model !== "" &&
    note !== "" &&
    etc !== ""
  ) {
    const preData: any = {
      LicensePlate: license,
      VehicleBrand: brand,
      VehicleModel: model,
      Note: note,
      etc: etc,
    };
    // console.log(vehicleClientAPI.addVehicle(preData));

    var errorState = 0;
    const res = vehicleClientAPI
      .addVehicle(preData)
      .catch((error) => {
        errorState = 1;
        alert(error.message);
        // console.log(error.message);
        return;
      })
      .then((result) => {
        if (errorState == 0) {
          if (result?.message == "Success") {
            alert("Add success");
            return window.location.replace("/");
          }
          //   console.log(result);
        }
      });

    // return console.log("Clicked", license, brand, model, note, etc);
  } else {
    alert("Please fill all information");
  }
}

export default function addVehicle() {
  const { Title } = Typography;
  return (
    <>
      <Navbar></Navbar>
      <Row align={"middle"} justify={"center"} style={{ marginTop: 50 }}>
        <Title>Add vehicle</Title>
      </Row>
      <Row align={"middle"}>
        <Col sm={12} offset={6} style={{ marginTop: 50 }}>
          <Input
            size="large"
            placeholder="License plate"
            prefix={<IdcardOutlined />}
            id="licensePlate"
            type="textarea"
          />
          <br />
          <br />
          <Input
            size="large"
            placeholder="VehicleBrand"
            prefix={<CarOutlined />}
            id="vehicleBrand"
            type="textarea"
          />
          <br />
          <br />
          <Input
            size="large"
            placeholder="VehicleModel"
            prefix={<InfoCircleOutlined />}
            id="vehicleModel"
            type="textarea"
          />
          <br />
          <br />
          <Input
            size="large"
            placeholder="Note"
            prefix={<SnippetsOutlined />}
            id="note"
            type="textarea"
          />
          <br />
          <br />
          <Input
            size="large"
            placeholder="etc"
            id="etc"
            prefix={<QuestionOutlined />}
          />
          <br />
          <br />
          <Row align={"middle"} justify={"center"}>
            <Button
              type="primary"
              shape="round"
              icon={<FileAddOutlined />}
              size={"large"}
              color="black"
              style={{ backgroundColor: "black" }}
              onClick={() => {
                clickAddVehicle();
              }}
            >
              Add Vehicle
            </Button>
          </Row>
        </Col>
      </Row>
      <br></br>
    </>
  );
}
