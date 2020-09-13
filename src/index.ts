import bodyParser from "body-parser";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { Application } from "probot";
import { readFields, readConfig, writeConfig } from "./setup";
import { render } from "./render";
import { metadata } from "./utils";

// use glitch env to get correct domain welcome message
// https://glitch.com/help/project/
const domain = process.env.PROJECT_DOMAIN || `http://localhost:${process.env.PORT || 3000}`;
const welcomeMessage = `Welcome to Probot Extended Setup! Go to ${domain}/probot/setup/extended to get started.`;

export = (app: Application): void => {
  if (!fs.existsSync(path.join(process.cwd(), "params.yml"))) {
    throw new Error("Missing required file params.yml");
  }

  const router = app.route("/probot/setup/extended");

  router.use(bodyParser.urlencoded({ extended: true }));

  router.get("/", (_, res: Response) => {
    const fields = readFields();
    const html = render("setup", { pkg: metadata.pkg, fields });

    res.end(html);
  });

  router.post("/", (req: Request, res: Response) => {
    let success;
    let message;

    try {
      writeConfig({ ...readConfig(), ...req.body });
      success = true;
    } catch (e) {
      app.log.error("Unable to write config to .env", e);
    }

    if (success) {
      message = {
        level: "success",
        text: "Configuration saved.",
      };
    } else {
      message = {
        level: "error",
        text: "Something went wrong when saving configuration.",
      };
    }

    const fields = readFields();
    const html = render("setup", { pkg: metadata.pkg, fields, message });

    res.end(html);
  });

  app.log.info(welcomeMessage);
};
