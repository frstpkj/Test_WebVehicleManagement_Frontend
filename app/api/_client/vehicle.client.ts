import { AxiosError } from "axios";
import _axios, { AxiosInstance } from "axios";

interface addVehicleResponse {
  message: any;
  status: number;
}

export default class vehicleClient {
  private axios: AxiosInstance;
  constructor(accessToken?: string) {
    this.axios = _axios.create({
      baseURL: "http://localhost:3000",
    });
  }

  public async getAllVehicle(): Promise<boolean> {
    const response = await this.axios.get<boolean>("/api/get");
    return response.data;
  }

  public async addVehicle(body: any): Promise<addVehicleResponse> {
    const response = await this.axios.post<addVehicleResponse>(
      "/api/add",
      body
    );
    return response.data;
  }

  public async editVehicle(
    licensePlate: any,
    body: any
  ): Promise<addVehicleResponse> {
    const response = await this.axios.post<addVehicleResponse>(
      `/api/update/${licensePlate}`,
      body
    );
    return response.data;
  }

  public async getVehicle(licensePlate: any): Promise<any> {
    const response = await this.axios.get<any>(`/api/get/${licensePlate}`);
    return response.data;
  }

  public async deleteVehicle(licensePlate: any): Promise<any> {
    const response = await this.axios.delete<any>(
      `/api/delete/${licensePlate}`
    );
    return response.data;
  }
}
