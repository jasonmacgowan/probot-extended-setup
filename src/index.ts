import bodyParser from "body-parser";
import { Request, Response } from "express";
import session from "express-session";
import fs from "fs";
import generatePassword from "password-generator";
import path from "path";
import { Application } from "probot";
import { authn, generateToken, readToken, writeToken } from "./security";
import { readFields, readConfig, writeConfig } from "./setup";
import { render } from "./render";
import { metadata } from "./utils";

// use glitch env to get correct domain welcome message
// https://glitch.com/help/project/
const domain = process.env.PROJECT_DOMAIN || `http://localhost:${process.env.PORT || 3000}`;
const welcomeMessage = `Welcome to Probot Extended Setup! Go to ${domain}/probot/setup/extended to get started.`;

// Generate a session secret pass into session middleware
const secret = generatePassword(32);

let token: string | null;
try {
  token = readToken();
} catch {
  token = null;
}

export = (app: Application): void => {
  if (!fs.existsSync(path.join(process.cwd(), "params.yml"))) {
    throw new Error("Missing required file params.yml");
  }

  // If we haven't completed setup once and the token file doens't exist, generate it
  const config = readConfig();
  if ((!config.PES_COMPLETE || config.PES_COMPLETE === "false") && token === null) {
    token = generateToken();
    const tokenPath = writeToken(token);

    app.log.info(`Authentication token: ${token}`);
    app.log.info(`Authentication token also written to: ${tokenPath}`);
  }

  const router = app.route("/probot/setup/extended");

  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(session({ secret, cookie: { maxAge: 30 * 60000 }, saveUninitialized: false, resave: true }));

  router.get("/", authn, (_, res: Response) => {
    const fields = readFields();
    const html = render("setup", { pkg: metadata.pkg, fields });

    res.end(html);
  });

  router.post("/", authn, (req: Request, res: Response) => {
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

  router.get("/authn", (_, res: Response) => {
    const html = render("authn", {});
    res.end(html);
  });

  router.post("/authn", (req: Request, res: Response) => {
    const { token: userToken } = req.body;

    if (token !== null && token === userToken) {
      if (req.session) {
        req.session.token = token;
        res.redirect("/probot/setup/extended");
      }
    } else {
      const message = {
        level: "error",
        text: "Invalid token.",
      };

      const html = render("authn", { message });
      res.end(html);
    }
  });

  app.log.info(welcomeMessage);
};
