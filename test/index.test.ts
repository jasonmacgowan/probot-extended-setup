import fs from "fs";
import nock from "nock";
import path from "path";
import { Probot, ProbotOctokit } from "probot";
import myProbotApp from "../src";

const privateKey = fs.readFileSync(path.join(__dirname, "fixtures/mock-cert.pem"), "utf-8");

describe("My Probot app", () => {
  let probot: Probot | null;

  beforeEach(() => {
    nock.disableNetConnect();
    probot = new Probot({
      id: 123,
      privateKey,
      // disable request throttling and retries for testing
      Octokit: ProbotOctokit.defaults({
        retry: { enabled: false },
        throttle: { enabled: false },
      }),
    });
    // Load our app into probot
    probot.load(myProbotApp);
  });

  test("not implemented", () => {
    expect(1 + 1).toBe(2);
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });
});

// For more information about testing with Jest see:
// https://facebook.github.io/jest/

// For more information about using TypeScript in your tests, Jest recommends:
// https://github.com/kulshekhar/ts-jest

// For more information about testing with Nock see:
// https://github.com/nock/nock
