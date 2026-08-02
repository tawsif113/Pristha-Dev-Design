export type SearchParamValue = string | number | null | undefined;

export function withSearchParams(
  pathname: string,
  values: Record<string, SearchParamValue>,
): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(values)) {
    if (value === null || value === undefined || value === "") continue;
    params.set(key, String(value));
  }
  const query = params.toString();
  return query ? pathname + "?" + query : pathname;
}
