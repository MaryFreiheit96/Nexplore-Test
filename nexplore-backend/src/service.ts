import { DutyRepository } from "./repositories/DutyRepository";
import * as http from "http";
import { IDuty } from "./interfaces/duty.interface";
import querystring from "querystring";
import url from "url";
export class DutyService {
  private repository: DutyRepository;
  constructor() {
    this.repository = new DutyRepository();
  }

  async createDuty(req: http.IncomingMessage, res: http.ServerResponse) {
    try {
      const body: IDuty = await this.getBody(req);
      const duty: IDuty = await this.repository.getDuty(body.id);
      if (duty) {
        res.writeHead(400, this.getHeaders());
        res.end("Duty already exists");
      } else {
        const newDuty = await this.repository.createDuty(body.id, body.name);
        res.writeHead(200, this.getHeaders());
        res.end(JSON.stringify(newDuty));
      }
    } catch (err) {
      res.writeHead(err.statusCode, this.getHeaders());
      res.end(err.message);
    }
  }

  async deleteDuty(req: http.IncomingMessage, res: http.ServerResponse) {
    try {
      const urlParsed = url.parse(req.url);
      const id = urlParsed.pathname.split("/")[1];
      const duty: IDuty = await this.repository.getDuty(id);
      if (!duty) {
        res.writeHead(400, this.getHeaders());
        res.end("Duty Not Found");
      } else {
        await this.repository.deleteDuty(id);
        res.writeHead(200, this.getHeaders());
        res.end(`Duty ${id} deleted successfully!`);
      }
    } catch (err) {
      res.writeHead(err.statusCode, this.getHeaders());
      res.end(err.message);
    }
  }
  async editDuty(req: http.IncomingMessage, res: http.ServerResponse) {
    try {
      const urlParsed = url.parse(req.url);
      const { name } = querystring.parse(urlParsed.query);
      const id = urlParsed.pathname.split("/")[1];
      const duty: IDuty = await this.repository.getDuty(id);
      if (!duty) {
        res.writeHead(400, this.getHeaders());
        res.end("Duty Not Found");
      } else {
        await this.repository.editDuty(id, name as string);
        res.writeHead(200, this.getHeaders());
        res.end(`Duty ${id} edited successfully!`);
      }
    } catch (err) {
      res.writeHead(err.statusCode, this.getHeaders());
      res.end(err.message);
    }
  }

  async getDuty(req: http.IncomingMessage, res: http.ServerResponse) {
    try {
      const urlParsed = url.parse(req.url);
      const id = urlParsed.pathname.split("/")[1];
      const duty: IDuty = await this.repository.getDuty(id);
      if (!duty) {
        res.writeHead(400, this.getHeaders());
        res.end("Duty Not Found");
      } else {
        res.writeHead(200, this.getHeaders());
        res.end(JSON.stringify(duty));
      }
    } catch (err) {
      res.writeHead(err.statusCode, this.getHeaders());
      res.end(err.message);
    }
  }

  async getAllDuties(res: http.ServerResponse) {
    try {
      const duties = await this.repository.getAllDuties();
      res.writeHead(200, this.getHeaders());
      res.end(JSON.stringify(duties));
    } catch (err) {
      res.writeHead(err.statusCode, this.getHeaders());
      res.end(err.message);
    }
  }

  async getBody(req: http.IncomingMessage) {
    let body = "";
    await req.on("data", (chunk) => {
      body += chunk.toString();
    });
    return JSON.parse(body);
  }

  getHeaders() {
    return {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*",
    };
  }
}
