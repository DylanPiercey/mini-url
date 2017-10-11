import * as assert from "assert";
import "mocha";

const EXAMPLES = {
  "http://user:pass@host.com/p/a/t/h?query=string#hash": {
    hash: "#hash",
    host: "host.com",
    hostname: "host.com",
    href: "http://user:pass@host.com/p/a/t/h?query=string#hash",
    pathname: "/p/a/t/h",
    port: "",
    protocol: "http:",
    search: "?query=string",
  },
  "http://user:pass@host.com:8080/p/a/t/h?query=string#hash": {
    hash: "#hash",
    host: "host.com:8080",
    hostname: "host.com",
    href: "http://user:pass@host.com:8080/p/a/t/h?query=string#hash",
    pathname: "/p/a/t/h",
    port: "8080",
    protocol: "http:",
    search: "?query=string",
  },
};

describe("Parse", () => {
  describe("Node", () => {
    const file = require.resolve("../dist/url");

    describe("Shim", () => {
      const URL = require(file).URL;
      delete require.cache[file];
      runTests(URL);
    });
  });

  describe("Browser", () => {
    const file = require.resolve("../dist/url/browser");
    describe("Native", () => {
      require("window-var").get().URL = require("url").URL;
      const URL = require(file).URL;
      delete require.cache[file];
      delete require("window-var").get().URL;
      runTests(URL);
    });

    describe("Shim", () => {
      const cleanup = require("jsdom-global")();
      delete require("window-var").get().URL;
      const URL = require(file).URL;
      delete require.cache[file];
      cleanup();
      runTests(URL);
    });
  });

  describe("Cached", () => {
    it("should be immutable", () => {
      const parse = require("../dist").parse;
      const parsed = parse("http://google.ca");
      assert.throws(() => {
        parsed.test = 1;
      }, TypeError);
    });
  });
});

/**
 * Runs tests for all of the urls at the top.
 */
function runTests(URL: any) {
  Object
    .keys(EXAMPLES)
    .forEach((href) => {
      it(href, () => {
        const actual = new URL(href);
        const expected = EXAMPLES[href];
        for (const key in expected) {
          if (!expected.hasOwnProperty(key)) {
            continue;
          }

          assert.equal(
            actual[key] || "",
            decodeURIComponent(expected[key]),
          );
        }
      });
    });
}
