import { DutyRepository } from "./repositories/DutyRepository";
import { IDuty } from "./interfaces/duty.interface";
import { GraphQLError } from "graphql";

export class DutyService {
  private repository: DutyRepository;
  constructor() {
    this.repository = new DutyRepository();
  }

  async createDuty({ id, name }: { id: string; name: string }) {
    const duty: IDuty = await this.repository.getDuty(id);
    if (duty)
      throw new GraphQLError("Duty Already Exists", {
        extensions: {
          code: "BAD_REQUEST",
        },
      });
    return this.repository.createDuty(id, name);
  }

  async getDuty({ id }: { id: string }) {
    const duty: IDuty = await this.repository.getDuty(id);
    if (!duty)
      throw new GraphQLError("Not Found", {
        extensions: {
          code: "NOT_FOUND",
        },
      });
    return duty;
  }

  async deleteDuty({ id }: { id: string }) {
    const duty: IDuty = await this.repository.getDuty(id);
    if (!duty)
      throw new GraphQLError("Not Found", {
        extensions: {
          code: "NOT_FOUND",
        },
      });
    await this.repository.deleteDuty(id);
    return "OK";
  }

  async editDuty({ id, name }: { id: string; name: string }) {
    const duty: IDuty = await this.repository.getDuty(id);
    if (!duty)
      throw new GraphQLError("Not Found", {
        extensions: {
          code: "NOT_FOUND",
        },
      });
    return this.repository.editDuty(id, name as string);
  }

  async getAllDuties() {
    return this.repository.getAllDuties();
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
