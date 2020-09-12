import bodyParser from "body-parser";
import { Request, Response } from "express";
import { Application } from "probot";
import { readFields, readConfig, writeConfig } from "./setup";
import { render } from "./render";
import { metadata } from "./utils";

export = (app: Application): void => {
  const router = app.route("/probot/setup/extended");

  router.use(bodyParser.urlencoded({ extended: true }));

  router.get("/", (_, res: Response) => {
    const fields = readFields();
    const html = render("setup", { pkg: metadata.pkg, fields });

    res.end(html);
  });

  router.post("/", (req: Request, res: Response) => {
    writeConfig({ ...readConfig(), ...req.body });
    res.redirect("/probot/setup/extended");
  });
};
