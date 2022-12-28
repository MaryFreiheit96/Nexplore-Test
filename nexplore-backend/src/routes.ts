import { DutyService } from "./service";
import * as http from "http";
import { pathToRegexp } from "path-to-regexp";

export default async function (
  req: http.IncomingMessage,
  res: http.ServerResponse
) {
  const dutyService = new DutyService();
  const url = req.url.split("?")[0];

  if (req.method === "POST" && url === "/create") {
    await dutyService.createDuty(req, res);
  } else if (req.method === "GET" && url === "/all") {
    await dutyService.getAllDuties(res);
  } else if (req.method === "GET" && url.match(pathToRegexp("/:id"))) {
    await dutyService.getDuty(req, res);
  } else if (req.method === "DELETE" && url.match(pathToRegexp("/:id"))) {
    await dutyService.deleteDuty(req, res);
  } else if (req.method === "PUT" && url.match(pathToRegexp("/:id"))) {
    await dutyService.editDuty(req, res);
  } else {
    res.writeHead(200, {
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ message: "Not Found" }));
  }
}
