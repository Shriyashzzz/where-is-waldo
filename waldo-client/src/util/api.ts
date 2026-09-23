const API_BASE = import.meta.env.VITE_SERVER_ADDRESS ?? "";

export function apiUrl(path: string) {
  return `${API_BASE}${path}`;
}
