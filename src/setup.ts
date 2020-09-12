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

/**
 * TODO
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
 * TODO
 */
export function readConfig(): { [key: string]: string } {
  let config;

  try {
    config = dotenv.parse(fs.readFileSync(path.join(process.cwd(), ".env"), "utf8"));
  } catch {
    config = {};
  }

  return config;
}

/**
 * TODO
 *
 * @param config
 */
export function writeConfig(config: { [key: string]: string }): void {
  if (Object.prototype.hasOwnProperty.call(config, "PRIVATE_KEY")) {
    config["PRIVATE_KEY"] = `"${config["PRIVATE_KEY"]}"`;
  }

  const serialized = Object.keys(config)
    .map((key) => `${key}=${config[key].replace(/\r?\n/g, "\\n")}`)
    .join(os.EOL);

  fs.writeFileSync(path.join(process.cwd(), ".env"), serialized);
}

/**
 * TODO
 */
export function readFields() {
  const params = readParams();
  const config = readConfig();

  return params.map((param) => {
    return {
      ...param,
      value: config[param.env],
    };
  });
}
