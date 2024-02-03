import { AxiosError } from "axios";
import _axios, { AxiosInstance } from "axios";
import { NextRequest, NextResponse } from "next/server";

interface BaseReturnType<T = any> {
  message: T;
}

interface DeleteResponse {
  message: String;
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

  async deleteVehicle(licenseplate: String): Promise<DeleteResponse> {
    const response = await this.axios.delete<BaseReturnType<DeleteResponse>>(
      `/vehicle/${licenseplate}`
    );
    return response.data.message;
  }
}

export async function DELETE(req: NextRequest, ctx: any) {
  try {
    const licenseplate = String(ctx.params.licenseplate);
    const repo = new TsVehicleRepository();
    const session = await repo.deleteVehicle(licenseplate);
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
