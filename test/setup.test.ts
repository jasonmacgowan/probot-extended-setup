import { readParams, readConfig } from "../src/setup";

describe("params", () => {
  describe("#read", () => {
    test("parses yaml with params definition", () => {
      const params = readParams();

      expect(params.length).toBe(4);
    });
  });

  describe("#readConfig", () => {
    test("parses .env", () => {
      expect(readConfig).not.toThrow();
    });
  });
});
