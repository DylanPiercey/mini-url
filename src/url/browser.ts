import { get as getLoc } from "get-loc";
import { get as getWindow } from "window-var";
import parts from "./parts";
const vendors = ["ms", "moz", "webkit", "o"];
let URL: InterfaceURL = tryVendors(getWindow(), "URL");

export interface InterfaceURL {
  /**
   * Creates a browser style URL object.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/URL}
   */
  new (path: string, base?: string): {
    protocol: string
    hostname: string
    pathname: string
    search: string
    host: string
    port: string
    hash: string
    href: string

    /**
     * Shortcut to retrieve the `href` for the URL.
     */
    toString(): string,
  };
}

// Check if browser supports native url parser.
try {
  Boolean(new URL("", "http://a"));
} catch (e) {
  const document = getWindow().document;
  if (!document) {
    throw new Error("URL parser not supported.");
  }

  // Load up a fake document to handle url resolution and parsing.
  const doc = document.implementation.createHTMLDocument("parser");
  const $base = doc.head.appendChild(doc.createElement("base"));
  const $a = doc.createElement("a");

  URL = class {
    public protocol: string;
    public hostname: string;
    public pathname: string;
    public search: string;
    public host: string;
    public port: string;
    public hash: string;
    public href: string;
    constructor(path: string, base?: string) {
      $base.href = base || getLoc().href;
      $a.href = path;

      // Copies parsed parts from the link.
      for (const part of parts) {
        (this as any)[part] = $a[part] || "";
      }

      // Patch for ie9 which excludes leading slash.
      if (this.pathname[0] !== "/") {
        this.pathname = "/" + this.pathname;
      }

      // Patch for browsers automatically adding default ports.
      if (this.port !== "") {
        const { href, hostname } = this;
        const hostIndex = href.indexOf(hostname) + hostname.length + 1;
        const expectedPort = href.slice(hostIndex, hostIndex + this.port.length);
        if (expectedPort !== this.port) {
          this.port = "";
          this.host = this.hostname;
        }
      }
    }

    public toString() {
      return this.href;
    }
  };
}

// Expose either the native URL class or a shim.
export { URL };

/**
 * Check for vendored versions of function
 */
function tryVendors(obj: any, field: string) {
  if (obj[field]) {
    return obj[field];
  }

  for (const vendor of vendors) {
    const alias = obj[vendor + field];
    if (alias) {
      return alias;
    }
  }
}
