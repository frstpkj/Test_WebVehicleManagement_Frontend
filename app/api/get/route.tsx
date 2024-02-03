import { AxiosError } from "axios";
import _axios, { AxiosInstance } from "axios";
import { NextRequest, NextResponse } from "next/server";

interface BaseReturnType<T = any> {
  message: T;
}

interface VehicleInfo {
  _id: String;
  LicensePlate: String;
  VehicleBrand: String;
  VehicleModel: String;
  Note: String;
  etc: String;
}

class TsVehicleRepository {
  private axios: AxiosInstance;
  constructor(accessToken?: string) {
    this.axios = _axios.create({
      baseURL: process.env.BASE_URL_API,
      headers: { Authorization: process.env.BASE_API_KEY },
    });
  }

  async getAllVehicle(): Promise<VehicleInfo> {
    const response = await this.axios.get<BaseReturnType<VehicleInfo>>(`/`);
    return response.data.message;
  }
}

export async function GET(req: NextRequest, ctx: any) {
  try {
    const repo = new TsVehicleRepository();
    const session = await repo.getAllVehicle();
    // console.log(session);
    return NextResponse.json(session);
  } catch (error: any) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data, {
        status: error.response?.status,
      });
    }
    const e = error.toString();
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
