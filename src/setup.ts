import dotenv from "dotenv";
import fs from "fs";
import yaml from "js-yaml";
import os from "os";
import path from "path";

type Param = {
  name: string;
  env: string;

  [key: string]: unknown;
};

type Config = {
  [key: string]: string;
};

/**
 * Read `params.yml` in the root directory of the current Probot app and
 * set a default `inputType` if it doesn't already exist.
 *
 * @param {string} defaultType use this HTML input type when not defined
 */
export function readParams(defaultType = "text"): Param[] {
  let params;

  try {
    params = yaml.load(fs.readFileSync(path.join(process.cwd(), "params.yml"), "utf8"));

    for (const param of params) {
      if (!Object.prototype.hasOwnProperty.call(param, "inputType")) {
        param["inputType"] = defaultType;
      }
    }
  } catch {
    params = {};
  }

  return params;
}

/**
 * Read current configuration from `.env` in the root directory of the current
 * Probot app.
 */
export function readConfig(): Config {
  let config;

  try {
    config = dotenv.parse(fs.readFileSync(path.join(process.cwd(), ".env"), "utf8"));
  } catch {
    config = {};
  }

  return config;
}

/**
 * Write the supplied config to disk on `.env`.
 *
 * @param {Config} config the current config
 */
export function writeConfig(config: Config): void {
  if (Object.prototype.hasOwnProperty.call(config, "PRIVATE_KEY")) {
    config["PRIVATE_KEY"] = `"${config["PRIVATE_KEY"]}"`;
  }

  const serialized = Object.keys(config)
    .map((key) => `${key}=${config[key].replace(/\r?\n/g, "\\n")}`)
    .join(os.EOL);

  fs.writeFileSync(path.join(process.cwd(), ".env"), serialized);
}

/**
 * Read the current params and config, and combine them for use
 * in the web editor
 */
export function readFields(): Param[] {
  const params = readParams();
  const config = readConfig();

  return params.map((param) => {
    return {
      ...param,
      value: config[param.env],
    };
  });
}
