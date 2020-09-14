import fs from "fs";
import path from "path";
import generatePassword from "password-generator";

const tokenFilename = ".token";
const tokenPath = path.join(process.cwd(), tokenFilename);

/**
 * Generate a token used for authentication that is 32
 * chars in length.
 */
export const generateToken = (): string => {
  return generatePassword(32);
};

/**
 * Write a given token to the default tokenfile location
 */
export const writeToken = (token: string): string => {
  fs.writeFileSync(tokenPath, token);
  return tokenPath;
};

/**
 * Read the auth token from the default tokenfile location.
 */
export const readToken = (): string => {
  return fs.readFileSync(tokenPath, "utf8");
};
