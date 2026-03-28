/**
 * Safely parse a URL/body integer ID.
 * Rejects non-canonical strings like "1abc" that parseInt() would silently accept.
 */
export function parseId(value: string | number | undefined | null): number | null {
  if (value === null || value === undefined) return null;
  const str = String(value).trim();
  if (!/^\d+$/.test(str)) return null;
  const n = Number(str);
  return Number.isInteger(n) && n > 0 ? n : null;
}
