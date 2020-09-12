import path from "path";

type PackageJSON = {
  [key: string]: unknown;
};

/**
 * Resolve a template path by basename in the `views` directory
 *
 * Probot already sets a template path so we need a way to
 * resolve where our custom templates are so we can pass a
 * full path to res.render in our routes.
 *
 * Example:
 * getTemplatePath('index') will resolve to <approot>/views/index
 *
 * The .hbs extension is implied
 *
 * @param name {string}
 * @returns {string} calculated filepath to template
 */
export function getTemplatePath(name: string): string {
  return path.join(__dirname, "..", "views", name);
}

export const metadata = {
  get pkg(): PackageJSON {
    let pkg: PackageJSON;
    try {
      pkg = require(path.join(process.cwd(), "package.json"));
    } catch (e) {
      pkg = {};
    }
    return pkg;
  },
};

/**
 * Convert arbitrary string in a slug that can be used in a URL.
 *
 * Replace all EN_US non-letter, non-number chars to a single
 * dash `-`, trim from the start and end then remove repetitive
 * dashes.
 *
 * @param str {string}
 */
export function getSlug(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]/g, "-")
    .replace(/-{2,}/, "-")
    .replace(/^-/, "")
    .replace(/-$/, "");
}

/**
 * Null/empty check
 *
 * See https://stackoverflow.com/a/3215653
 * @param {*} e
 */
export function isEmpty(str: unknown): boolean {
  if (typeof str === "string") {
    str = str.trim();
  }

  switch (str) {
    case "":
    case 0:
    case "0":
    case null:
    case false:
    case typeof str == "undefined":
      return true;
    default:
      return false;
  }
}
