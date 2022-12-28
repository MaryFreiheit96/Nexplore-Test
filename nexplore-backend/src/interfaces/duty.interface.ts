import { throws } from "assert";
import { Column, Entity, PrimaryColumn } from "typeorm";

export interface IDuty {
  id: string;
  name: string;
}
