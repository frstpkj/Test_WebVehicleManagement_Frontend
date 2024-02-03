import { AxiosError } from "axios";
import _axios, { AxiosInstance } from "axios";
import { NextRequest, NextResponse } from "next/server";

interface BaseReturnType<T = any> {
  message: T;
}

interface UpdateResponse {
  message: string;
  data: any;
}

class TsVehicleRepository {
  private axios: AxiosInstance;
  constructor(accessToken?: string) {
    this.axios = _axios.create({
      baseURL: process.env.BASE_URL_API,
      headers: { Authorization: process.env.BASE_API_KEY },
    });
  }

  async addVehicle(body: any): Promise<UpdateResponse> {
    const response = await this.axios.post<BaseReturnType<UpdateResponse>>(
      `/vehicle/`,
      body
    );
    return response.data.message;
  }
}

export async function POST(req: NextRequest, ctx: any) {
  try {
    const body = await req.json();

    const repo = new TsVehicleRepository();
    const session = await repo.addVehicle(body);
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
