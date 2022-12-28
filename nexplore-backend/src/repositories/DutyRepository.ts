import { pool } from "../database/data-source";

export class DutyRepository {
  private repository: any;
  constructor() {
    this.repository = pool();
  }

  async createDuty(id: string, name: string) {
    const response = await this.repository.query(
      "INSERT INTO duties (id,name) VALUES  ($1,$2) RETURNING *",
      [id, name]
    );
    return response?.rows?.[0];
  }

  async getDuty(id: string) {
    const response = await this.repository.query(
      "SELECT * FROM duties WHERE id = $1",
      [id]
    );
    return response?.rows?.[0] ?? null;
  }

  async getAllDuties() {
    const response = await this.repository.query("SELECT * FROM duties");
    return response && response.rows ? response.rows : [];
  }

  async editDuty(id: string, name: string) {
    const response = await this.repository.query(
      "UPDATE duties SET name = $1 WHERE id = $2",
      [name, id]
    );
    return response;
  }

  async deleteDuty(id: string) {
    return this.repository.query("DELETE FROM duties WHERE id = $1", [id]);
  }
}
