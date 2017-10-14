import * as assert from "assert";
import * as path from "path";
import * as NodeURL from "url";

const EXAMPLES = [
  {
    base: "http://user:pass@host.com",
    path: "/p/a/t/h?query=string#hash",
    result: {
      hash: "#hash",
      host: "host.com",
      hostname: "host.com",
      href: "http://user:pass@host.com/p/a/t/h?query=string#hash",
      pathname: "/p/a/t/h",
      port: "",
      protocol: "http:",
      search: "?query=string"
    }
  },
  {
    base: "http://user:pass@host.com:8080",
    path: "/p/a/t/h?query=string#hash",
    result: {
      hash: "#hash",
      host: "host.com:8080",
      hostname: "host.com",
      href: "http://user:pass@host.com:8080/p/a/t/h?query=string#hash",
      pathname: "/p/a/t/h",
      port: "8080",
      protocol: "http:",
      search: "?query=string"
    }
  },
  {
    base: "http://google.ca",
    path: "/p/a/t/h?",
    result: {
      hash: "#hash",
      host: "host.com:8080",
      hostname: "host.com",
      href: "http://user:pass@host.com:8080/p/a/t/h?query=string#hash",
      pathname: "/p/a/t/h",
      port: "8080",
      protocol: "http:",
      search: "?query=string"
    }
  }
];

describe("Parse", () => {
  describe("Node", () => {
    const file = path.join(__dirname, "../src/url/index.ts");

    describe("Shim", () => {
      const URL = require(file).URL;
      delete require.cache[file];
      runTests(URL);
    });
  });

  describe("Browser", () => {
    const file = path.join(__dirname, "../src/url/browser.ts");
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
    it("should cache results", () => {
      const parse = require("../src").parse;
      assert.deepEqual(parse("http://google.ca"), parse("http://google.ca"));
    });

    it("should support base url", () => {
      const parse = require("../src").parse;
      assert.equal(
        String(parse("page2", "http://google.ca/test/page1")),
        "http://google.ca/test/page2"
      );
    });

    it("should be immutable", () => {
      const parse = require("../src").parse;
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
  for (const example of EXAMPLES) {
    const href = NodeURL.resolve(example.base || "", example.path);

    it(href, () => {
      const actual = new URL(example.path, example.base);
      const expected = EXAMPLES[href];
      assert.equal(String(actual), href);

      for (const key in expected) {
        if (!expected.hasOwnProperty(key)) {
          continue;
        }

        assert.equal(actual[key] || "", decodeURIComponent(expected[key]));
      }
    });
  }
}
