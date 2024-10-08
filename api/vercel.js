import { createServer } from "http";
import { parse } from "url";
import app from "./app";

export default (req, res) => {
  const parsedUrl = parse(req.url, true);
  app.handle(req, res, parsedUrl);
};
