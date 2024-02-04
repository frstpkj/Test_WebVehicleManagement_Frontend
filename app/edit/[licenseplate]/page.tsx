"use client";
import Navbar from "@/app/navbar";
import React, { useState } from "react";
import {
  CarOutlined,
  IdcardOutlined,
  SnippetsOutlined,
  InfoCircleOutlined,
  QuestionOutlined,
  EditOutlined,
} from "@ant-design/icons";
import vehicleClient from "@/app/api/_client/vehicle.client";
import { useParams } from "next/navigation";
import { Input, Col, Row, Typography, Button } from "antd";
import { useEffect } from "react";
interface VehicleData {
  _id: string;
  LicensePlate: string;
  VehicleBrand: string;
  VehicleModel: string;
  Note: string;
  etc: string;
}

function clickEditVehicle(licensePlate: any) {
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
      .editVehicle(licensePlate, preData)
      .catch((error) => {
        errorState = 1;
        alert(error.message);
        // console.log(error.message);
        return;
      })
      .then((result: any) => {
        if (errorState == 0) {
          if (result == "Success") {
            alert("Edit Success");
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

export default function editVehicle() {
  const params = useParams();
  const vehicleClientAPI = new vehicleClient();
  const [vehicleData, setVehicleData] = useState<VehicleData>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const resData = vehicleClientAPI
      .getVehicle(params?.licenseplate)
      .then((res) => {
        setVehicleData(res);
        setLoading(false);
      });
  }, []);

  console.log(vehicleData?._id);

  const { Title } = Typography;
  if (loading == false)
    return (
      <>
        <Navbar></Navbar>
        <Row align={"middle"} justify={"center"} style={{ marginTop: 50 }}>
          <Title>Edit vehicle</Title>
        </Row>
        <Row align={"middle"}>
          <Col sm={12} offset={6} style={{ marginTop: 50 }}>
            <Input
              size="large"
              placeholder="License plate"
              prefix={<IdcardOutlined />}
              id="licensePlate"
              type="textarea"
              defaultValue={vehicleData?.LicensePlate}
            />
            <br />
            <br />
            <Input
              size="large"
              placeholder="VehicleBrand"
              prefix={<CarOutlined />}
              id="vehicleBrand"
              type="textarea"
              defaultValue={vehicleData?.VehicleBrand}
            />
            <br />
            <br />
            <Input
              size="large"
              placeholder="VehicleModel"
              prefix={<InfoCircleOutlined />}
              id="vehicleModel"
              type="textarea"
              defaultValue={vehicleData?.VehicleModel}
            />
            <br />
            <br />
            <Input
              size="large"
              placeholder="Note"
              prefix={<SnippetsOutlined />}
              id="note"
              type="textarea"
              defaultValue={vehicleData?.Note}
            />
            <br />
            <br />
            <Input
              size="large"
              placeholder="etc"
              id="etc"
              prefix={<QuestionOutlined />}
              defaultValue={vehicleData?.etc}
            />
            <br />
            <br />
            <Row align={"middle"} justify={"center"}>
              <Button
                type="primary"
                shape="round"
                icon={<EditOutlined />}
                size={"large"}
                color="black"
                style={{ backgroundColor: "black" }}
                onClick={() => {
                  clickEditVehicle(vehicleData?.LicensePlate);
                }}
              >
                Edit Vehicle
              </Button>
            </Row>
          </Col>
        </Row>
        <br></br>
      </>
    );
}
