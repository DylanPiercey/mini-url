import { parse, resolve } from "url";
import parts from "./parts";

export class URL {
  public protocol: string;
  public hostname: string;
  public pathname: string;
  public search: string;
  public host: string;
  public port: string;
  public hash: string;
  public href: string;

  /**
   * Creates a browser style URL object.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/URL}
   */
  constructor(path: string, base?: string) {
    const parsed = parse(base ? resolve(base, path) : path);

    if (parsed.search === "?") {
      parsed.search = "";
    }

    for (const part of parts) {
      (this as any)[part] = (parsed as any)[part];
    }
  }

  /**
   * Shortcut to retrieve the `href` for the URL.
   */
  public toString() {
    return this.href;
  }
}
