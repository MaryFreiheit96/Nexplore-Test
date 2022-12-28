import axios from "axios";
import { config } from "../config";
export class DutyService {
  static getBaseUrl() {
    console.log(`${config.HOST_BACK}:${config.PORT_BACK}`);
    return `${config.HOST_BACK}:${config.PORT_BACK}`;
  }
  static async createDuty(duty: { id: string; name: string }) {
    await axios.post(`${this.getBaseUrl()}/create`, duty, {
      headers: this.getHeaders(),
    });
  }
  static async editDuty(id: string, name: string) {
    await axios.put(`${this.getBaseUrl()}/${id}?name=${name}`, {
      headers: this.getHeaders(),
    });
  }
  static async deleteDuty(id: string) {
    await axios.delete(`${this.getBaseUrl()}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  static async geAllDuties() {
    const response = await axios.get(`${this.getBaseUrl()}/all`, {
      headers: this.getHeaders(),
    });
    if (!response.data) throw new Error(response.statusText);
    return response.data;
  }

  static getHeaders() {
    return {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    };
  }
}
