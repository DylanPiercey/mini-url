import * as T from "./_types";
import { URL } from "./url";
import parts from "./url/parts";

const separator: string = "~#~";
const cache: { [x: string]: T.URL } = {};

export { T as Types };
export { parts, cache };

/**
 * @description
 * Creates a browser style URL object.
 * See: https://developer.mozilla.org/en-US/docs/Web/API/URL
 *
 * @example
 * parse("http//google.ca") // { protocol: "http", hostname: "google", ... }
 *
 * @param url The url string to parse.
 * @param base The base part of the url to resolve from.
 */
export function parse(url: string, base?: string): T.URL {
  const key: string = url + separator + base;
  // Try to return cached url.
  const cached: T.URL = cache[key];
  if (cached) {
    return cached;
  }

  // Parse url and cache result.
  const parsed: T.URL = base ? new URL(url, base) : new URL(url);
  const result: T.URL = { toString };

  // Make each part default to empty string for consistency.
  for (const part of parts) {
    let data = (parsed as any)[part];
    if (data == null) {
      data = "";
    }

    result[part] = data;
  }

  // Freeze object to maintain cache.
  return (cache[key] = Object.freeze(result));
}

/**
 * @description
 * Converts a URL like object into an href.
 *
 * @param parsed A parsed url object containing.
 */
export function stringify(parsed: T.URL) {
  if (typeof parsed !== "object" || parsed == null) {
    throw new TypeError("URL must be an object.");
  }

  // istanbul ignore next
  return (
    (parsed.protocol ? parsed.protocol + "//" : "") +
    (parsed.host ||
      (parsed.hostname || "") + (parsed.port ? ":" + parsed.port : "")) +
    (parsed.pathname || "") +
    (parsed.search || "") +
    (parsed.hash || "")
  );
}

/**
 * @description
 * To string method for cloned urls.
 */
function toString(this: T.URL): string {
  return this.href;
}
