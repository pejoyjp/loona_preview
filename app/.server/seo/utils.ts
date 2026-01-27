export function truncate(str: string, num = 155): string {
  if (typeof str !== "string") {
    return "";
  }
  if (str.length <= num) {
    return str;
  }
  return `${str.slice(0, num - 3)}...`;
}

export function parseNumber(value?: number | string | null): number | undefined {
  if (value === null || value === undefined) return undefined;
  const parsed = typeof value === "number" ? value : Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}
