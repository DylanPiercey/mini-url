import { URL } from "./url";
import parts from "./url/parts";
const separator: string = "~#~";
const cache: { [x: string]: InterfaceURLInstance } = {};

export interface InterfaceURLInstance {
  protocol?: string;
  host?: string;
  hostname?: string;
  port?: string;
  pathname?: string;
  search?: string;
  hash?: string;
  href?: string;
  toString(): string;
}

export { parts, cache };

/**
 * Creates a browser style URL object.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/URL}
 */
export function parse(path: string, base?: string): InterfaceURLInstance {
  const key: string = path + separator + base;
  // Try to return cached url.
  const cached: InterfaceURLInstance = cache[key];
  if (cached) {
    return cached;
  }

  // Parse url and cache result.
  const parsed: InterfaceURLInstance = base ? new URL(path, base) : new URL(path);
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
  return cache[key] = Object.freeze(result);
}

/**
 * Converts a URL like object into an href.
 */
export function stringify(parsed: InterfaceURLInstance) {
  if (typeof parsed !== "object" || parsed == null) {
    throw new TypeError("URL must be an object.");
  }

  return (
    (parsed.protocol ? parsed.protocol + "//" : "") +
    (parsed.host || (parsed.hostname || "") + (parsed.port ? ":" + parsed.port : "")) +
    (parsed.pathname || "") +
    (parsed.search || "") +
    (parsed.hash || "")
  );
}
