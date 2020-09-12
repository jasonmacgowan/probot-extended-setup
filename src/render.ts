import fs from "fs";
import handlebars from "handlebars";
import path from "path";

/**
 * TODO
 *
 * @param {string} name
 */
export const load = (name: string): string => {
  return fs.readFileSync(path.join(__dirname, "..", "views", `${name}.hbs`), "utf-8");
};

/**
 * TODO
 */
const partials: {
  [key: string]: string[];
} = {
  checkbox: ["checkbox"],
  input: ["text", "password"],
  select: ["select"],
  textarea: ["textarea"],
};

/**
 * TODO
 */
for (const partial in partials) {
  for (const type of partials[partial]) {
    handlebars.registerPartial(type, load(`partials/form/${partial}`));
  }
}

/**
 * TODO
 *
 * @param {string} name
 * @param {object} context
 */
export const render = (name: string, context: { [key: string]: unknown }): string => {
  const template = handlebars.compile(load(name), { preventIndent: true });
  return template(context);
};
