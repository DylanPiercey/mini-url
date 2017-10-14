import * as assert from "assert";
import { stringify } from "../src";

const EXAMPLES = {
  "http://host.com:8080/p/a/t/h?query=string#hash": {
    hash: "#hash",
    hostname: "host.com",
    pathname: "/p/a/t/h",
    port: "8080",
    protocol: "http:",
    search: "?query=string"
  }
};

describe("Stringify", () => {
  Object.keys(EXAMPLES).forEach(href => {
    it(href, () => {
      const actual = stringify(EXAMPLES[href]);
      const expected = href;
      assert.equal(actual, expected);
    });
  });

  describe("should fail with non object", () => {
    assert.throws(() => {
      stringify(1);
    });
  });
});
