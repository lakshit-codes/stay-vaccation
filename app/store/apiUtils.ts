export async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("sv_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  const { success, data, ...rest } = await res.json();
  
  if (!res.ok || success === false) {
    throw new Error(rest.message || rest.error || `Request failed with status ${res.status}`);
  }

  return (data !== undefined ? data : rest) as T;
}
