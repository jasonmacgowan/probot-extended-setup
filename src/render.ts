import fs from "fs";
import handlebars from "handlebars";
import path from "path";

type Context = {
  [key: string]: unknown;
};

/**
 * Load a view by name from the `views` directory.
 *
 * @param {string} name basename for view
 * @returns {string} full path to template
 */
export const load = (name: string): string => {
  return fs.readFileSync(path.join(__dirname, "..", "views", `${name}.hbs`), "utf-8");
};

/**
 * Simple map that connects HTML input types to handlebars partials that
 * live in `views/partials/form
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
 * Register each partial in the map above to Handlebars so we can use them
 * in our templates
 */
for (const partial in partials) {
  for (const type of partials[partial]) {
    handlebars.registerPartial(type, load(`partials/form/${partial}`));
  }
}

/**
 * Render a view by name with a given context.
 *
 * @param {string} name basename for view
 * @param {Context} context vars to render with
 * @returns {string} the rendered template
 */
export const render = (name: string, context: Context): string => {
  const template = handlebars.compile(load(name), { preventIndent: true });
  return template(context);
};
