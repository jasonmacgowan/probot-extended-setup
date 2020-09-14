import { Request, Response, NextFunction } from "express";
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

/**
 * Express middleware for enforcing authentication with the token
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const authn = (req: Request, res: Response, next: NextFunction) => {
  const allowlist = ["127.0.0.1", "::f", "::ffff:127.0.0.1"];

  if (allowlist.indexOf(req.connection.remoteAddress || "") >= 0) {
    // allow access from localhost
    next();
    return;
  }

  const tokenExists = fs.existsSync(tokenPath);

  if (tokenExists) {
    const token = readToken();

    if (req.session && token === req.session.token) {
      // token in session matches
      next();
      return;
    } else {
      req.session?.destroy(function () {
        res.redirect("/probot/setup/extended/authn");
      });

      return;
    }
  }

  res.writeHead(404);
  res.end();
};
