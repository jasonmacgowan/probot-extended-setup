import path from "path";
import { getSlug, getTemplatePath, metadata } from "../src/utils";

describe("utils", () => {
  describe("#getSlug", () => {
    test("stips special chars", () => {
      expect(getSlug("!@#$%^&*()_+my awesome-url ")).toBe("my-awesome-url");
    });
  });

  describe("#getTemplatePath", () => {
    test("resolves template path", () => {
      const viewPath = path.join(__dirname, "..", "views", "setup");
      expect(getTemplatePath("setup")).toBe(viewPath);
    });
  });

  describe("metadata", () => {
    describe("#get", () => {
      test("reads package.json", () => {
        const { name, version } = metadata.pkg;

        expect(name).toBe("probot-extended-setup");
        expect(version).toMatch(/[0-9]+\.[0-9]+\.[0-9]+/);
      });
    });
  });
});
