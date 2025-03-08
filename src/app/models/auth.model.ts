// src/app/models/auth.model.ts
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  username: string;
  roles: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  role: string;
}
