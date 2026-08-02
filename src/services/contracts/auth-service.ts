import type { AuthUser } from "@/src/types/domain";

export interface AuthService {
  getCurrentUser(): Promise<AuthUser | null>;
  requireUser(returnTo: string): Promise<AuthUser>;
}
