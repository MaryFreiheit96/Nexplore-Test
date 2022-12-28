import "reflect-metadata";
import * as http from "http";
import routes from "./routes";
import { config } from "../config";

const server = http.createServer(
  async (req: http.IncomingMessage, res: http.ServerResponse) => {
    await routes(req, res);
  }
);

server.listen(config.PORT, () => {
  console.log(`Server running at ${config.HOST}:${config.PORT}`);
});
