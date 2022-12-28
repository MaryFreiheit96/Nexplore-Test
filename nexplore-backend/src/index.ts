import "reflect-metadata";
import * as http from "http";
import routes from "./routes";

const port = 3100;

const server = http.createServer(
  async (req: http.IncomingMessage, res: http.ServerResponse) => {
    console.log("method", req.method);
    await routes(req, res);
  }
);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
