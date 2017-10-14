import * as T from "./_types";
import { URL } from "./url";
import parts from "./url/parts";

const separator: string = "~#~";
const cache: { [x: string]: T.URL } = {};

export { T as Types };
export { parts, cache };

/**
 * Creates a browser style URL object.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/URL}
 */
export function parse(path: string, base?: string): T.URL {
  const key: string = path + separator + base;
  // Try to return cached url.
  const cached: T.URL = cache[key];
  if (cached) {
    return cached;
  }

  // Parse url and cache result.
  const parsed: T.URL = base ? new URL(path, base) : new URL(path);
  const result: any = {};

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
 * Converts a URL like object into an href.
 */
export function stringify(parsed: T.URL) {
  if (typeof parsed !== "object" || parsed == null) {
    throw new TypeError("URL must be an object.");
  }

  return (
    (parsed.protocol ? parsed.protocol + "//" : "") +
    (parsed.host ||
      (parsed.hostname || "") + (parsed.port ? ":" + parsed.port : "")) +
    (parsed.pathname || "") +
    (parsed.search || "") +
    (parsed.hash || "")
  );
}
