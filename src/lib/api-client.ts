const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://appifylab-task-backend-ywpz.onrender.com";

export class ApiError extends Error {
  status: number;
  /** Per-field validation errors from the backend ProblemDetails, if any. */
  fieldErrors?: Record<string, string[]>;

  constructor(status: number, message: string, fieldErrors?: Record<string, string[]>) {
    super(message);
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

type RequestOptions = Omit<RequestInit, "body"> & { body?: unknown; isForm?: boolean };

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, isForm, headers, ...rest } = options;

  const init: RequestInit = {
    ...rest,
    credentials: "include", // send/receive the httpOnly auth cookie
    headers: {
      ...(isForm ? {} : body ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: isForm ? (body as BodyInit) : body ? JSON.stringify(body) : undefined,
  };

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, init);
  } catch {
    // Network-level failure (server down, wrong API URL, CORS/TLS) — surface it
    // instead of throwing a raw TypeError that the UI can't recognize.
    throw new ApiError(0, `Cannot reach the API at ${API_URL}. Is the backend running and NEXT_PUBLIC_API_URL correct?`);
  }

  if (res.status === 204) return undefined as T;

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const message = data?.detail || data?.title || data?.error || `Request failed (${res.status})`;
    throw new ApiError(res.status, message, data?.errors);
  }

  return data as T;
}

export const api = {
  get: <T>(path: string) => request<T>(path, { method: "GET" }),
  post: <T>(path: string, body?: unknown) => request<T>(path, { method: "POST", body }),
  postForm: <T>(path: string, form: FormData) => request<T>(path, { method: "POST", body: form, isForm: true }),
  del: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
