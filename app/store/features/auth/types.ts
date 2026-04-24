export interface AuthState {
  user: {
    userId: string;
    email: string;
    role: string;
    name?: string;
  } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  authChecked: boolean;
}
