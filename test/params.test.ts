import { read, readConfig } from "../src/params";

describe("params", () => {
  describe("#read", () => {
    test("parses yaml with params definition", () => {
      const params = read();

      expect(params.length).toBe(4);
    });
  });

  describe("#readConfig", () => {
    test("parses .env", () => {
      expect(readConfig).not.toThrow();
    });
  });
});
