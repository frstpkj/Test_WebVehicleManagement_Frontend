import { AxiosError } from "axios";
import _axios, { AxiosInstance } from "axios";

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
}
